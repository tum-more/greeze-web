import { type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

const guestPages = ["/login", "/signup"] as const;
const publicPages = [] as const;

export default async function middleware(request: NextRequest) {
  // we handle protected routes in `updateSession` middleware
  return await updateSession(request);
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
