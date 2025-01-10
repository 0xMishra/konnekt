import {
  ChevronDown,
  Hash,
  Plus,
  Settings,
  Video,
  Volume1,
} from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { type } from "os";

export const ChannelsListSidebar = () => {
  // Sample data for channels
  const channels = [
    {
      category: "Text Channels",
      type: "text",
      items: ["general", "help", "announcements"],
    },
    {
      category: "Voice Channels",
      type: "audio",
      items: ["General", "Music"],
    },
  ];

  return (
    <div className="hidden h-full w-96 flex-col bg-sidebar-background text-text-color-in-sidebar md:flex">
      <div className="border-text-chat-hover-background flex items-center justify-between border-[2px] border-solid px-4 py-3">
        <h2 className="text-lg font-bold">Server Name</h2>
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
                  className="cursor-pointer rounded px-2 py-2 text-lg hover:bg-sidebar-hover-background hover:text-text-color-in-chat"
                  key={idx}
                >
                  {category.type === "text" ? (
                    <div className="flex items-center">
                      <Hash className="pr-1" />
                      {channel}
                    </div>
                  ) : category.type === "audio" ? (
                    <div className="flex items-center">
                      <Volume1 /> {channel}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Video />
                      {channel}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <div className="flex cursor-pointer items-center justify-between hover:text-text-color-in-chat">
            <h3 className="text-lg font-semibold uppercase">MEMBERS</h3>
            <button className="">
              <Settings />
            </button>
          </div>
        </div>
        <div className="mt-2 flex justify-start p-2">
          <div className="pr-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <div className="pl-1">
            <p className="cursor-pointer text-lg font-semibold hover:text-text-color-in-chat">
              Shadcn Antonio{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
