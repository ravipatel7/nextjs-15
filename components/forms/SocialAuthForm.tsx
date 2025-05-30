"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3 cursor-pointer";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        // redirect: false, // Prevent automatic redirection
        redirectTo: ROUTES.HOME,
      });
    } catch (error) {
      console.error("Error during sign-in:", error);
      toast.error("Sign-in Failed", {
        description:
          error instanceof Error ?
            error.message
          : "Failed to sign in. Please try again.",
        duration: 3000,
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn("github")}>
        <Image
          src="/icons/github.svg"
          alt="GitHub Logo"
          width={20}
          height={20}
          className="invert-colors"
        />
        Log in with GitHub
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
        />
        Log in with Google
      </Button>
    </div>
  );
};
export default SocialAuthForm;
