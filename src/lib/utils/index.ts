import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SafeParseReturnType, z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const decodeForm = async <Schema extends z.ZodTypeAny>(
  formDataOrRequest: FormData | Request,
  schema: Schema,
) => {
  const formData =
    formDataOrRequest instanceof FormData
      ? formDataOrRequest
      : await formDataOrRequest.clone().formData();

  return schema.parse(Object.fromEntries(formData)) as z.infer<Schema>;
};

export const safeDecodeForm = async <Schema extends z.ZodTypeAny>(
  formDataOrRequest: FormData | Request,
  schema: Schema,
) => {
  const formData =
    formDataOrRequest instanceof FormData
      ? formDataOrRequest
      : await formDataOrRequest.clone().formData();

  return schema.safeParse(Object.fromEntries(formData)) as SafeParseReturnType<
    z.input<Schema>,
    z.output<Schema>
  >;
};

export const getSiteURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};
