import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (!tokenHash || !type) {
    return new Response("Invalid token", { status: 400 });
  }

  const supabase = createClient();

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    // @ts-ignore
    type,
  });

  return NextResponse.redirect(new URL("/", request.url));
}

//https://tdzayrfpjctgkalonpws.supabase.co/auth/v1/verify?token=pkce_7c00af7f9d4f2390d0bc242aa043c88b2177a7e107af612d1a13765c&type=magiclink&redirect_to=http://localhost:3000/
