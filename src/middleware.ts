import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/logout", "/_next", "/favicon.ico"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  const hasAuthCookie = request.cookies.get("fetch-access-token");

  if (!hasAuthCookie && !isPublic) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
