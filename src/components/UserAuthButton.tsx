"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const UserAuthButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await signIn("google");
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      variant={"discord"}
      className={cn("w-[100%] text-lg font-semibold")}
      disabled={isLoading}
      onClick={signInWithGoogle}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <div className="flex items-center justify-center text-lg text-white">
          <FaGoogle /> <p className="pl-1">Sign in with google</p>
        </div>
      )}
    </Button>
  );
};
