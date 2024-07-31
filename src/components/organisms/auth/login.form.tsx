"use client";

import { InputErrorMessage } from "@/components/atom/input-error-message";
import { AppleIcon } from "@/components/icons/apple.icon";
import { GoogleIcon } from "@/components/icons/google.icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircularLoader } from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from "@/lib/auth/auth.actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export function LoginForm() {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {},
  );

  const signInWithEmail = async (formData: FormData) => {
    const response = await signIn(formData);
    console.log("signInWithEmail", response);

    if (response.success) {
      setErrors({});
      toast({
        title: "We send you a magic link to your email",
        description: "Please check your email",
        variant: "success",
      });
      return;
    }

    setErrors({ ...response.error.issues });

    if (response.error.message) {
      toast({
        title: "Error",
        description: response.error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center">
            <span className="text-2xl text-black font-medium">G</span>
          </div>
        </div>
        <CardTitle className="text-lg text-center">Sign In to Greeze</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 mt-6">
        <div className="flex justify-center items-center gap-3">
          <Button variant="default" className="flex-1 gap-4">
            <span className="h-6">
              <GoogleIcon className="h-5 w-5 top-2" />
            </span>
            <span>Google</span>
          </Button>
          <Button variant="default" className="flex-1 gap-4">
            <span className="h-6">
              <AppleIcon className="h-5 w-5 top-9" />
            </span>
            <span>Apple</span>
          </Button>
        </div>
        <div className="flex justify-center items-center gap-3 text-muted-foreground">
          <div className="h-[1px] w-full bg-border"></div>
          or
          <div className="h-[1px] w-full bg-border"></div>
        </div>
        <form action={signInWithEmail} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email adddress</Label>
            <Input id="email" placeholder="Email" name="email" type="email" />
            <InputErrorMessage errors={errors.email} />
          </div>
          <LoginButton />
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full gap-4 transition-all">
      {pending && <CircularLoader className="h-5 w-5 animate-spin" />}
      <span className="transition-all">Sign in</span>
    </Button>
  );
}
