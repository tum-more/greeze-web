import Image from "next/image";
import Link from "next/link";
import { NavMenuItem } from "./nav.menu.item";
import { NavAvatar } from "./nav-avatar";
import { getMyProfile } from "@/lib/profile/profile.data";

export async function NavigationBar() {
  const profile = await getMyProfile();

  return (
    <div className="flex-col items-center container mx-auto">
      <nav className="flex items-center justify-between w-full bg-background h-20">
        <div className="flex items-baseline space-x-4">
          <Link href="/" className="text-2xl font-medium">
            Greeze
          </Link>
          <NavMenuItem href="/profiles/emilychen/">Artists</NavMenuItem>
        </div>
        {profile == null ? (
          <div className="flex items-center space-x-4">
            <NavMenuItem href="/sign-in">Sign In</NavMenuItem>
          </div>
        ) : (
          <NavAvatar
            profile={{
              name: profile.name ?? "",
              profile_url: profile.profile_url,
            }}
          />
        )}
      </nav>
    </div>
  );
}
