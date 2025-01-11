import { getAuthSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { CreateNewServerModal } from "./CreateNewServerModal";
import { DarkModeToggle } from "./DarkModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const ServersList = async ({
  currentServerId,
  servers,
}: {
  servers: {
    id: string;
    name: string;
    image: string | null;
  }[];
  currentServerId: string;
}) => {
  const session = await getAuthSession();
  if (!session) {
    return "";
  }

  const channelsForThisServer = await db.server.findUnique({
    where: { id: currentServerId },
    select: {
      name: true,
      channels: { select: { id: true } },
    },
  });

  const channelId = channelsForThisServer?.channels[0]?.id;
  console.log("server:", channelsForThisServer?.name, "channel:", channelId);

  return (
    <div className="hidden h-full w-16 flex-col items-center space-y-3 bg-server-list-background p-4 text-gray-300 sm:flex">
      <CreateNewServerModal />

      <div className="h-px w-8 bg-gray-700"></div>

      {servers.map((server, index) => (
        <div
          key={server.id}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-xl"
          title={server.name}
        >
          {server.image ? (
            <Link
              href={`/server/${server.id}/channel/${channelId}`}
              className={`flex items-center justify-center ${server.id === currentServerId ? "relative -left-3" : ""}`}
            >
              {server.id === currentServerId ? (
                <ChevronRight className="" />
              ) : (
                ""
              )}
              <Avatar
                className={`transition-all duration-200 hover:rounded-2xl ${server.id === currentServerId ? "rounded-2xl border-[2px] border-solid border-text-color-in-chat" : ""}`}
              >
                <AvatarImage src={server.image} />
                <AvatarFallback>{server.name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link
              href={`/server/${server.id}/channel/${channelId}`}
              className={`flex items-center justify-center ${server.id === currentServerId ? "relative -left-3" : ""}`}
            >
              {server.id === currentServerId ? (
                <ChevronRight className="" />
              ) : (
                ""
              )}
              <Avatar
                className={`transition-all duration-200 hover:rounded-2xl ${server.id === currentServerId ? "rounded-2xl" : ""}`}
              >
                <AvatarFallback>{server.name[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      ))}

      <div className="absolute bottom-10 my-4 flex flex-col items-center justify-center">
        <div className="my-3">
          <DarkModeToggle />
        </div>

        <div>
          <Avatar className="transition-all duration-200 hover:rounded-2xl">
            <AvatarImage src={session.user.image!} />
            <AvatarFallback>
              {session.user.name![0]?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
