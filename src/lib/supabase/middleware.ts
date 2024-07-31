import { env } from "@/env.mjs";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "./supabase.db.types";

// document ref: https://supabase.com/docs/guides/auth/server-side/nextjs

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  console.log("pathname", pathname);

  const publicPath = isPublicPath(request.nextUrl.pathname);
  const guestPath = isGuestPath(request.nextUrl.pathname);

  if (publicPath || pathname === "/") {
    return supabaseResponse;
  }

  if (!user && !guestPath) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    url.searchParams.set("redirect_to", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // handle authenticated user try to access a only guest path. e.g. /sign-in, /sing-up
  if (user && guestPath) {
    const { searchParams } = new URL(request.url);
    const redirectTo = searchParams.get("redirect_to");
    console.log("redirectTo", redirectTo);
    if (redirectTo) {
      const url = request.nextUrl.clone();
      url.pathname = redirectTo;
      url.searchParams.delete("redirect_to");
      return NextResponse.redirect(url);
    }
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}

const guestPaths = ["/sign-in", "/sign-up", "/auth"];
const publicPaths = ["/auth/confirm", "auth/verify", "/about-us"];

const isPublicPath = (path: string) =>
  publicPaths.some((p) => path.startsWith(p));
const isGuestPath = (path: string) =>
  guestPaths.some((p) => path.startsWith(p));
