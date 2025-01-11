import { ServersList } from "@/components/ServersList";
import { getAuthSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import React from "react";

const serverIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>;
}) => {
  const session = await getAuthSession();

  const { serverId } = await params;

  if (!session) {
    redirect("/");
  }

  const servers = await db.server.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      members: { select: { id: true }, where: { id: session.user.id } },
      channels: { select: { id: true } },
    },
  });

  if (servers.length === 0) {
    redirect("/");
  }
  return (
    <main className="flex h-screen w-screen items-center justify-end">
      <div className="flex h-full w-[100%] items-center justify-end">
        <ServersList servers={servers} currentServerId={serverId} />
        {children}
      </div>
    </main>
  );
};

export default serverIdLayout;
