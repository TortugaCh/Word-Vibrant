// import { NextResponse } from "next/server";
// import { checkCredits, getAction } from "./lib/utils";

// export async function middleware(req) {
//   const userData = JSON.parse(req.cookies.get("userData")?.value);
//   const { pathname, origin } = req.nextUrl;

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

//   if (isPublicRoute) {
//     return NextResponse.next();
//   }

//   // If no token is present, redirect to /auth
//   if (!userData) {
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   try {
//     // // Validate the token and get the user's role

//     const userRole = userData?.role || null;

//     if (pathname === "/") {
//       if (userRole === "Admin") {
//         return NextResponse.redirect(new URL("/admin/dashboard", req.url));
//       } else {
//         return NextResponse.redirect(new URL("/user/dashboard", req.url));
//       }
//     }
//     // Role-based routing
//     if (pathname.startsWith("/admin") && userRole !== "Admin") {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }

//     if (pathname.startsWith("/user") && userRole !== "User") {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }

//     // Protected routes requiring credits
//     const creditRequiredRoutes = [
//       "/user/stroke-order/practice",
//       "/user/coloring-page/download",
//       "/user/create-a-story/view",
//       "/user/create-a-dialogue/view",
//     ];
//     const requiresCredits = creditRequiredRoutes.some((route) =>
//       pathname.startsWith(route)
//     );

//     if (requiresCredits && userRole === "User") {

//       const action = getAction(pathname);

//       // const creditData = await creditResponse.json();
//       const creditData = await checkCredits(
//         userData.userId,
//         action,
//         pathname.split("/").pop()
//       );

//       if (!creditData.success) {
//         return NextResponse.redirect(new URL("/no-credits", req.url));
//       }
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Error in middleware:", error);
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!api).*)"], // Apply middleware to all routes except API routes
// };
// import { NextResponse } from "next/server";
// import { checkCredits, getAction } from "./lib/utils";
// import { serialize } from "cookie";
// import { parse } from "cookie";

// export async function middleware(req) {
//   const { pathname, origin } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;
//   // Get cookies from the request
//   // Public routes (accessible without token)
//   const publicRoutes = [
//     "/",
//     "/auth",
//     "/pricing",
//     "/no-credits",
//     "/about-us",
//     "/privacy",
//   ];

//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route)
//   );
//   // If no userData is present, redirect to login
//   if (!token && !isPublicRoute) {
//     console.log("No user data");
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }

//   if (isPublicRoute) {
//     // const userRole = userData?.role || null;
//     // console.log("User role:", userRole);
//     // // Redirect user based on role if the request is on the root path
//     // if (pathname === "/" || pathname === "/auth") {
//     //   console.log(
//     //     `Redirecting user to ${
//     //       userRole === "Admin" ? "/admin/dashboard" : "/user/dashboard"
//     //     }`
//     //   );
//     //   // Redirect to corresponding dashboard based on user role
//     //   return NextResponse.redirect(
//     //     new URL(
//     //       userRole === "Admin" ? "/admin/dashboard" : "/user/dashboard",
//     //       req.url
//     //     )
//     //   );
//     // }
//     return NextResponse.next();
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify the token
//     const userRole = decoded.role; // Get the user role from the decoded token
//     req.user = decoded; // Attach the user data to the request object
//     // Role-based routing: Admin access
//     if (pathname.startsWith("/admin") && userRole !== "Admin") {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }

//     // Role-based routing: User access
//     if (pathname.startsWith("/user") && userRole !== "User") {
//       return NextResponse.redirect(new URL("/auth", req.url));
//     }

//     // Protected routes that require credits
//     const creditRequiredRoutes = [
//       "/user/stroke-order/practice",
//       "/user/coloring-page/download",
//       "/user/create-a-story/view",
//       "/user/create-a-dialogue/view",
//     ];

//     const requiresCredits = creditRequiredRoutes.some((route) =>
//       pathname.startsWith(route)
//     );

//     if (requiresCredits && userRole === "User") {
//       const action = getAction(pathname);

//       // Check if the user has enough credits to access the route
//       const creditData = await checkCredits(
//         token,
//         action,
//         pathname.split("/").pop()
//       );

//       if (!creditData.success) {
//         return NextResponse.redirect(new URL("/no-credits", req.url));
//       }
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Error in middleware:", error);
//     return NextResponse.redirect(new URL("/auth", req.url));
//   }
// }

// export const config = {
//   matcher: ["/((?!api).*)"], // Apply middleware to all routes except API routes
// };

import { NextResponse } from "next/server";
import { checkCredits, getAction } from "./lib/utils";
import { jwtVerify } from 'jose'; // Import the jwtVerify function from jose

export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

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

  // If no token and the route is not public, redirect to login
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  // Allow public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }


  try {
    // Decode and verify the JWT token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Convert the secret into a Uint8Array
    const { payload } = await jwtVerify(token, secret); // Verify and decode the JWT token
    const userRole = payload.role; // Get the user role from the decoded token
    console.log(payload);
    // Attach user data to request for further use if needed
    req.user = payload;

    // Role-based access control
    if (
      (pathname.startsWith("/admin") && userRole !== "Admin") ||
      (pathname.startsWith("/user") && userRole !== "User")
    ) {
      return NextResponse.redirect(new URL("/auth", req.url)); // Redirect if user role does not match route
    }

    // Check credits for protected routes
    // console.log(payload.userId, action, pathname.split("/").pop());
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
      // Check if the user has enough credits to access the route
      const action = getAction(pathname);
      const creditData = await checkCredits(
        payload.userId,
        action,
        pathname.split("/").pop()
      );

      if (!creditData.success) {
        return NextResponse.redirect(new URL("/no-credits", req.url)); // Redirect if credits are insufficient
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to login if there is an error
  }
}

export const config = {
  matcher: ["/((?!api).*)"], // Apply middleware to all routes except API routes
};
