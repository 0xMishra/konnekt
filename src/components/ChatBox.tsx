import { Hash, Plus, Smile } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ChatBox = ({
  channelName,
  channelType,
  messages,
}: {
  channelName: string;
  channelType: string;
  messages: {
    type: string;
    creator: {
      image: string | null;
      name: string | null;
    };
    text: string;
    createdAt: Date;
  }[];
}) => {
  return (
    <>
      {channelType === "text" ? (
        <section className="max-w-9xl relative flex h-full w-[100%] flex-col items-end justify-start bg-chat-background">
          <div className="flex h-full w-[100%] flex-col items-start justify-start">
            <div className="border-text-chat-hover-background absolute right-0 top-0 z-30 w-[100%] border-b-[2px] border-solid bg-chat-background p-3">
              <nav className="w-[100%]">
                <p className="text-xl font-semibold md:text-2xl">
                  <span className="pr-2 text-2xl font-semibold text-text-color-in-chat">
                    #
                  </span>{" "}
                  {channelName}{" "}
                </p>
              </nav>
            </div>

            <div className="mt-16 flex h-full w-full max-w-[768px] flex-col items-start p-3 pb-28">
              <div className="mt-auto text-lg">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sidebar-hover-background text-5xl">
                  <Hash size={40} />
                </div>
                <h2 className="mt-3 text-2xl font-semibold sm:text-3xl md:text-5xl">
                  Welcome to #{channelName}
                </h2>
                <p className="text-md mt-3 font-semibold text-gray-500 sm:text-xl">
                  This is the start of the #{channelName} channel
                </p>
              </div>

              {messages.length > 0 ? (
                <div className="mt-2 flex w-[100%] items-center justify-start p-2">
                  {messages.map((msg, idx) => {
                    const { text, type, creator, createdAt } = msg;
                    return (
                      <>
                        <div className="pr-1">
                          <Avatar>
                            {creator.image ? (
                              <>
                                <AvatarImage src={creator.image!} />
                                <AvatarFallback>
                                  {creator.name![0]?.toUpperCase()}
                                </AvatarFallback>
                              </>
                            ) : (
                              <AvatarFallback>
                                {creator.name![0]?.toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                        </div>

                        <div className="pl-1">
                          <p className="text-lg font-semibold sm:text-xl">
                            {creator.name}
                            <span className="pl-1 text-[1rem] text-gray-500">
                              {createdAt.toLocaleDateString("en-US")}
                            </span>
                          </p>
                          <p className="relative -top-1 text-text-color-in-sidebar">
                            {type === "text" ? text : ""}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-30 mx-2 flex h-20 w-[100%] items-center justify-start rounded-tl-xl rounded-tr-xl bg-sidebar-hover-background p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-text-color-in-chat text-chat-background">
                <Plus />
              </div>

              <div className="w-[100%] pl-1">
                <Input
                  placeholder="Message #general"
                  type="text"
                  className={cn(
                    "ml-1 h-16 w-[95%] border-0 bg-transparent p-2 text-2xl outline-0 placeholder:font-semibold focus:outline-0 focus-visible:ring-0",
                  )}
                  style={{ fontSize: "1.3rem" }}
                />
              </div>

              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full text-text-color-in-chat">
                <Smile size={40} />
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};
