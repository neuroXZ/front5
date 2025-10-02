import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Senarai page yang tak perlu login
  const publicPaths = ["/login", "/api", "/_next", "/favicon.ico"];

  // Jika path public, benarkan akses
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Jika tiada token, redirect ke login dengan notis
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("message", "Sila login untuk akses sistem.");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
