import { NextResponse } from "next/server";
import { checkCredits, getAction } from "./lib/utils";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname, origin } = req.nextUrl;

  // Public routes (accessible without token)
  const publicRoutes = [
    "/auth",
    "/pricing",
    "/no-credits",
    "/about-us",
    "/privacy",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // If no token is present, redirect to /auth
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  try {
    // Validate the token and get the user's role
    const response = await fetch(`${origin}/api/auth/verifyToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await response.json();
    console.log(data)
    const userRole = data?.userData?.role || null;

    if (!data.valid) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (pathname === "/") {
      if (userRole === "Admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }
    // Role-based routing
    if (pathname.startsWith("/admin") && userRole !== "Admin") {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (pathname.startsWith("/user") && userRole !== "User") {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    // Protected routes requiring credits
    const creditRequiredRoutes = [
      "/user/stroke-order/practice",
      "/user/coloring-page/download",
      "/user/create-a-story/view",
      "/user/create-a-dialogue/view",
    ];
    const requiresCredits = creditRequiredRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (requiresCredits && userRole === "User") {
      // const creditResponse = await fetch(
      //   `${origin}/api/auth/checkCredits`,
      //   {
      //     method: "PUT",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       token,
      //       action: pathname.includes("stroke-order")
      //         ? "stroke-order"
      //         : "coloring-page",
      //       word: pathname.split("/").pop(),
      //     }),
      //   }
      // );
      const action = getAction(pathname);

      // const creditData = await creditResponse.json();
      const creditData = await checkCredits(
        token,
        action,
        pathname.split("/").pop()
      );

      if (!creditData.success) {
        return NextResponse.redirect(new URL("/no-credits", req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/((?!api).*)"], // Apply middleware to all routes except API routes
};
