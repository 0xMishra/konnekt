import { SignInForm } from "@/components/SignInForm";
import { getAuthSession } from "@/server/auth/config";
import { redirect } from "next/navigation";
import React from "react";

const signInPage = async () => {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/");
  }
  return (
    <main>
      <SignInForm />
    </main>
  );
};

export default signInPage;
