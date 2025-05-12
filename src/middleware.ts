import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/logout", "/_next", "/favicon.ico", "/api"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const hasAuthCookie = request.cookies.has("fetch-access-token");

  // Redirect logged-in user away from login page
  if (pathname === "/login" && hasAuthCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect not-logged-in users away from private pages
  if (!isPublic && !hasAuthCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api).*)"], // exclude _next, api, favicon from middleware
};
