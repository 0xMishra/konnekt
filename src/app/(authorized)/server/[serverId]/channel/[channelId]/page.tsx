import { ChatBox } from "@/components/ChatBox";
import { getAuthSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

const channelPage = async ({
  params,
}: {
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
    },
  });

  return (
    <>
      <ChatBox
        messages={currentServer?.channels[0]?.messages!}
        channelName={currentServer?.channels[0]?.name!}
        channelType={currentServer?.channels[0]?.type!}
      />
    </>
  );
};

export default channelPage;
