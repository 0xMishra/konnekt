import { NewServerCreateForm } from "@/components/NewServerCreateForm";
import { getAuthSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

async function HomePage() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/sign-in");
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

  if (servers.length > 0) {
    redirect(
      `/server/${servers[0]?.id}/channel/${servers[0]?.channels[0]?.id}`,
    );
  }

  if (servers.length === 0) {
    return (
      <main className="flex h-screen w-screen items-center justify-end">
        <div className="flex h-full w-[100%] flex-col items-center justify-center">
          <h1 className="my-5 text-center text-2xl md:text-3xl">
            You are not a member of any server yet
          </h1>
          <NewServerCreateForm />{" "}
        </div>
      </main>
    );
  }
}

export default HomePage;
