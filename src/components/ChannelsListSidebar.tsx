import {
  ChevronDown,
  Hash,
  Plus,
  Settings,
  Video,
  Volume1,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

export const ChannelsListSidebar = ({
  serverName,
  members,
  channels,
  currentChannelId,
  currentServerId,
}: {
  serverName: string;
  members: { name: string | null; image: string | null }[];
  channels: {
    category: string;
    type: string;
    items: { id: string; name: string }[];
  }[];
  currentChannelId: string;
  currentServerId: string;
}) => {
  const route = `/server/${currentServerId}/channel`;
  return (
    <div className="hidden h-full w-96 flex-col bg-sidebar-background text-text-color-in-sidebar md:flex">
      <div className="border-text-chat-hover-background flex items-center justify-between border-[2px] border-solid px-4 py-3">
        <h2 className="text-lg font-bold">{serverName}</h2>
        <button className="">
          <ChevronDown />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {channels.map((category, index) => (
          <div className="px-3 py-2" key={index}>
            <div className="flex cursor-pointer items-center justify-between hover:text-text-color-in-chat">
              <h3 className="text-md font-semibold uppercase">
                {category.category}
              </h3>
              <button className="">
                <Plus />
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {category.items.map((channel, idx) => (
                <li
                  className={`cursor-pointer rounded px-2 py-2 text-lg hover:bg-sidebar-hover-background hover:text-text-color-in-chat ${channel.id === currentChannelId ? "bg-sidebar-hover-background text-text-color-in-chat" : ""}`}
                  key={idx}
                >
                  {category.type === "text" ? (
                    <div className="flex items-center">
                      <Hash className="pr-1" />
                      <Link href={`${route}/${channel.id}`}>
                        {channel.name}
                      </Link>
                    </div>
                  ) : category.type === "audio" ? (
                    <div className="flex items-center">
                      <Volume1 />
                      <Link href={`${route}/${channel.id}`}>
                        {channel.name}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Video />
                      <Link href={`${route}/${channel.id}`}>
                        {channel.name}
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {members.length > 0 ? (
        <div className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <div className="flex cursor-pointer items-center justify-between hover:text-text-color-in-chat">
              <h3 className="text-lg font-semibold uppercase">MEMBERS</h3>
              <button className="">
                <Settings />
              </button>
            </div>
          </div>

          {members.map((member, idx) => {
            const { name, image } = member;
            return (
              <div className="mt-2 flex justify-start p-2" key={idx}>
                <div className="pr-1">
                  <Avatar>
                    <AvatarImage src={image || ""} />
                    <AvatarFallback>
                      {name ? name[0]?.toUpperCase() : ""}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="pl-1">
                  <p className="cursor-pointer text-lg font-semibold hover:text-text-color-in-chat">
                    {name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
