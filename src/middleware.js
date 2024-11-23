import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes (accessible to everyone)
  const publicRoutes = [
    "/auth",
    "/",
    "/pricing",
    "/no-credits",
    "/about-us",
    "/privacy",
  ];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If no token is present, redirect to /auth
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Validate the token and get the user's role
  let userRole = null;
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/auth/verifyToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    if (!data.valid) {
      // If the token is invalid, redirect to /auth
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    userRole = data.userData.role; // Assume `verifyToken` API returns the user's role
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Define route groups
  const adminRoutes = ["/admin"];
  const userRoutes = ["/user"];

  // Redirect based on role and route
  if (
    adminRoutes.some((route) => pathname.startsWith(route)) &&
    userRole !== "Admin"
  ) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (
    userRoutes.some((route) => pathname.startsWith(route)) &&
    userRole !== "User"
  ) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Protected routes requiring credits
  const creditRequiredRoutes = [
    "/user/stroke-order/practice",
    "/user/coloring-page/download",
  ];
  const requiresCredits = creditRequiredRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresCredits) {
    try {
      const creditResponse = await fetch(
        `${req.nextUrl.origin}/api/auth/checkCredits`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            action: pathname.includes("stroke-order")
              ? "stroke-order"
              : "coloring-page",
            word: pathname.split("/").pop(),
          }),
        }
      );

      const creditData = await creditResponse.json();

      if (!creditData.success) {
        return NextResponse.redirect(new URL("/no-credits", req.url));
      }
    } catch (error) {
      console.error("Error deducting credits:", error);
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // Allow access to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api).*)"], // Apply middleware to all routes except API routes
};
