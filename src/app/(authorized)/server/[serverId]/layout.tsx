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

  let servers = await db.server.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },

    where: { creatorId: session.user.id },
  });

  const channels = await db.channel.findMany({
    select: { id: true, serverId: true },
  });

  if (servers.length === 0) {
    servers = await db.server.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
      where: { members: { some: { id: session.user.id } } },
    });

    if (servers.length === 0) redirect("/");
  }
  return (
    <main className="flex h-screen w-screen items-center justify-end">
      <div className="flex h-full w-[100%] items-center justify-end">
        <ServersList
          channels={channels}
          servers={servers}
          currentServerId={serverId}
        />
        {children}
      </div>
    </main>
  );
};

export default serverIdLayout;
