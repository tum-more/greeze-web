"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogoutIcon } from "../icons/logout.icon";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { CircularLoader } from "../ui/loader";
import { signOut } from "@/lib/auth/auth.actions";
import { toast } from "../ui/use-toast";

type Props = {
  profile: {
    name: string;
    profile_url: string | null;
  };
};

export function NavAvatar({ profile }: Props) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    const response = await signOut();

    if (!response) {
      return;
    }

    if (!response?.success) {
      toast({
        title: "Error",
        description: response?.error.message,
        variant: "destructive",
      });
    }

    setLoggingOut(false);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-12 w-12 cursor-pointer">
          {profile.profile_url && (
            <AvatarImage src={profile.profile_url} className="object-cover" />
          )}
          <AvatarFallback className="text-sm">{profile.name}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-32 border-accent flex flex-col items-center space-y-4"
      >
        <div className="text-sm">{profile.name}</div>
        <div className="text-sm">View Profile</div>
        <button
          onClick={handleLogout}
          className="text-sm flex space-x-2 items-center"
        >
          <div className="h-5 w-5 flex justify-center items-center">
            {loggingOut ? <CircularLoader /> : <LogoutIcon />}
          </div>
          <span>Logout</span>
        </button>
      </PopoverContent>
    </Popover>
  );
}
