import { getAuthSession } from "@/server/auth/config";
import { redirect } from "next/navigation";
import React from "react";

const authorizedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <>{children}</>;
};

export default authorizedLayout;
