import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getAuthSession } from "@/server/auth/config";
import { DarkModeToggle } from "./DarkModeToggle";

export const ServersList = async () => {
  const session = await getAuthSession();
  if (!session) {
    return "";
  }

  const servers = [{ name: "Home", image: "https://github.com/shadcn.png" }];

  return (
    <div className="hidden h-full w-16 flex-col items-center space-y-3 bg-server-list-background p-4 text-gray-300 sm:flex">
      <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-lg transition-all duration-200 hover:rounded-2xl hover:bg-add-button-background">
        <Plus />
      </div>

      <div className="h-px w-8 bg-gray-700"></div>

      {servers.map((server, index) => (
        <div
          key={index}
          className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-xl"
          title={server.name}
        >
          <Avatar className="transition-all duration-200 hover:rounded-2xl">
            <AvatarImage src={server.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
