import { cache } from "react";
import { createClient } from "../supabase/server";
import { time } from "console";

export const getMyProfile = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("username, name, profile_url, cover_url, bio, location, created_at")
    .eq("id", user.id)
    .single();
  if (error) {
    return null;
  }

  return data;
});
