import { ChannelsListSidebar } from "@/components/ChannelsListSidebar";
import { getAuthSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const channelIdLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ serverId: string; channelId: string }>;
}) => {
  const session = await getAuthSession();

  const { serverId, channelId } = await params;

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

  const currentServer = await db.server.findUnique({
    where: { id: serverId },
    select: {
      id: true,
      name: true,
      channels: {
        select: {
          name: true,
          type: true,
          messages: {
            select: {
              createdAt: true,
              text: true,
              type: true,
              creator: { select: { name: true, image: true } },
            },
          },
        },
        where: { id: channelId },
      },
      members: {
        select: { name: true, image: true },
      },
    },
  });

  const channelsForCurrentServer = await db.channel.findMany({
    where: { serverId: serverId },
  });

  const channels: {
    category: string;
    type: string;
    items: { id: string; name: string }[];
  }[] = [
    {
      category: "Text Channels",
      type: "text",
      items: [],
    },
    {
      category: "Voice Channels",
      type: "audio",
      items: [],
    },
    {
      category: "Video Channels",
      type: "video",
      items: [],
    },
  ];

  channelsForCurrentServer.map((channel) => {
    if (channel.type === "text")
      channels[0]?.items.push({ id: channel.id, name: channel.name });
    if (channel.type === "audio")
      channels[1]?.items.push({ id: channel.id, name: channel.name });
    if (channel.type === "video")
      channels[2]?.items.push({ id: channel.id, name: channel.name });
  });

  return (
    <>
      <ChannelsListSidebar
        currentServerId={currentServer?.id!}
        currentChannelId={channelId}
        members={currentServer?.members!}
        channels={channels}
        serverName={currentServer?.name!}
      />
      {children}
    </>
  );
};

export default channelIdLayout;
