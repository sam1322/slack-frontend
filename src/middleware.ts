import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const isSignInPage = (pathname: string) => pathname === "/signin";
const isProtectedRoute = (pathname: string) =>
  pathname.startsWith("/") && pathname != "/signin";

// Helper function to check if the request has a valid JWT token
async function isAuthenticated(request: NextRequest) {
  const tokenObj = request.cookies.get("token");
  const token = tokenObj?.value;
  console.log("token", token);
  if (!token) return false;

  try {
    // Verify the JWT token (using the same secret key as on the Golang server)

    // Optionally, you can also verify the token by making a request to your Golang backend
    const response = await axios.get("http://localhost:8080/api/p/v1/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const isValid = response.status == 200;
    return isValid;

    // return !!decoded;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname for testing", pathname);
  // If user is already signed in and tries to visit the sign-in page, redirect to /product

  const isAuth = await isAuthenticated(request);
  console.log("isAuth", isAuth);

  if (isSignInPage(pathname) && isAuth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is not authenticated and tries to visit a protected route, redirect to /signin
  if (isProtectedRoute(pathname) && !isAuth) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // Allow the request to continue if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  // The following matcher runs middleware on all routes except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
