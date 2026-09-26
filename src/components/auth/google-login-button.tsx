"use client";

import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { bffFetch } from "@/lib/api-client";
import type { SessionUser } from "@/types/api";

interface Props {
  /** Text shown on the button — Google enforces "Sign in with Google" branding */
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
}

/**
 * Renders Google's branded "Sign in with Google" button.
 * On success the library returns a `credential` (id_token) which we send to
 * our BFF → backend for verification and JWT issuance.
 */
export function GoogleLoginButton({ text = "continue_with" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google sign-in failed — no credential received.");
      return;
    }

    try {
      await bffFetch<{ user: SessionUser }>("/api/auth/google", {
        method: "POST",
        body: { idToken: credentialResponse.credential },
      });
      toast.success("Signed in with Google!");
      router.push(redirectTo || "/");
      router.refresh();
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google sign-in was cancelled or failed.")}
      text={text}
      shape="rectangular"
      theme="outline"
      size="large"
      width="100%"
      useOneTap={false}
    />
  );
}
