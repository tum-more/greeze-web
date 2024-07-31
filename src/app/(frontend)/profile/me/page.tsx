import { createClient } from "@/lib/supabase/server";

const getProfile = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log("error", error);
    return null;
  }
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();
  return profile;
};

export default async function MyProfilePage() {
  const profile = await getProfile();
  return (
    <div className="w-full max-w-xl mx-auto shadow-md mt-4 sm:mt-8 border border-border rounded-lg">
      <div className="p-4 rounded-lg">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <p className="text-sm">{profile?.name}</p>
      </div>
    </div>
  );
}
