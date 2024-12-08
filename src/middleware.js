// import { NextResponse } from "next/server";
// import { jwtVerify } from 'jose'; // Import the jwtVerify function from jose

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;

//   // Public routes (accessible without token)
//   const publicRoutes = [
//     "/auth",
//     "/pricing",
//     "/no-credits",
//     "/about-us",
//     "/privacy",
//   ];
//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   // If no token and the route is not public, redirect to login
//   if (!token && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }
//   // Allow public routes
//   if (isPublicRoute) {
//     return NextResponse.next();
//   }

//   try {
//     // Decode and verify the JWT token
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Convert the secret into a Uint8Array
//     const { payload } = await jwtVerify(token, secret); // Verify and decode the JWT token
//     const userRole = payload?.role; // Get the user role from the decoded token
//     // Role-based access control
//     if (
//       (pathname.startsWith("/admin") && userRole !== "Admin") ||
//       (pathname.startsWith("/user") && userRole !== "User")
//     ) {
//       return NextResponse.redirect(new URL("/auth", req.url)); // Redirect if user role does not match route
//     }
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Error in middleware:", error);
//     return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to login if there is an error
//   }
// }

// export const config = {
//   matcher: ["/((?!api).*)"], // Apply middleware to all routes except API routes
// };

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Allow static files and Next.js assets to bypass authentication
  if (
    pathname.startsWith("/_next") || // Next.js assets (build files)
    pathname.startsWith("/images") || // Static images in the public folder
    pathname.startsWith("/favicon.ico") || // Favicon
    pathname.startsWith("/robots.txt") // Static robots.txt
  ) {
    return NextResponse.next();
  }

  // Public routes
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

  // Redirect unauthenticated users from protected routes
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload?.role;

    // Role-based access control
    if (
      (pathname.startsWith("/admin") && userRole !== "Admin") ||
      (pathname.startsWith("/user") && userRole !== "User")
    ) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico|robots.txt).*)"], // Exclude static files and API routes
};
