"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { loginFormSchema } from "./auth.schema";
import { decodeForm, getSiteURL, safeDecodeForm } from "../utils";
import type { ActionResponse } from "@/lib/utils/types";
import { createClient } from "../supabase/server";

export async function signIn(formData: FormData): Promise<AuthActionResponse> {
  const supabase = createClient();

  const parseResult = await safeDecodeForm(formData, loginFormSchema);
  if (!parseResult.success) {
    return {
      success: false,
      error: {
        issues: parseResult.error.flatten().fieldErrors,
      },
    };
  }

  const { email } = parseResult.data;

  const siteURL = getSiteURL();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${siteURL}`,
    },
  });

  if (error) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }

  return {
    success: true,
  };
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOut(): Promise<LogoutActionResponse | undefined> {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      error: {
        message: error.message,
      },
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// Mark: - Types
type AuthActionResponse = ActionResponse<typeof loginFormSchema.shape, null>;

type LogoutActionResponse = ActionResponse<{}, null>;
