import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";
import { getSession } from "./lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Only apply auth check for /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = await getSession();
    if (!session || !session.user) {
      return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.nextUrl));
    }
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/admin/(.*)",
  ],
};
