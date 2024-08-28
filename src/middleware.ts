import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const loginPath = "/";
const redirectPath = "/patients";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authState");
  const authCookieValue = authCookie?.value;

  const isAuthenticated = Boolean(
    authCookieValue && JSON.parse(authCookieValue)?.isAuthenticated
  );

  if (isAuthenticated && request.nextUrl.pathname === loginPath) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (!isAuthenticated && request.nextUrl.pathname !== loginPath) {
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/patients", "/new-patient"],
};
