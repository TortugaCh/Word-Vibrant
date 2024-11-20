import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Allow access to public routes (e.g., /auth and /)
  const publicRoutes = [
    "/auth",
    "/",
    "/pricing",
    "/no-credits",
    "about-us",
    "privacy",
  ];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If no token is present, redirect to /auth
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Define protected routes that require credit deduction
  const creditRequiredRoutes = [
    "/stroke-order/practice",
    "/coloring-page/download",
  ];
  const requiresCredits = creditRequiredRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If the route requires credits, deduct them
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

      // If the user doesn't have enough credits, redirect to an error page
      if (!creditData.success) {
        return NextResponse.redirect(new URL("/no-credits", req.url));
      }
    } catch (error) {
      console.error("Error deducting credits:", error);
      return NextResponse.redirect(new URL("/auth", req.url));
    }
  }

  // Continue with token validation
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/auth/verifyToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();

    // If the token is invalid, redirect to /auth
    if (!data.valid) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // If the token is valid, continue to the requested route
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/((?!api).*)"], // Apply the middleware to all routes except API routes
};
