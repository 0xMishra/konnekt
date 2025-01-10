import { ChannelsListSidebar } from "@/components/ChannelsListSidebar";
import { ChatBox } from "@/components/ChatBox";
import { ServersList } from "@/components/ServersList";
import { getAuthSession } from "@/server/auth/config";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="flex h-screen w-screen items-center justify-end">
      <div className="flex h-full w-[100%] items-center justify-end">
        <ServersList />
        <ChannelsListSidebar />
        <ChatBox />
      </div>
    </main>
  );
}

export default HomePage;
