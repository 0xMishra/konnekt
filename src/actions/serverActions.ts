"use server";

import { getAuthSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { serverCreationSchema } from "@/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewServerAction(
  prevState: any,
  formData: FormData,
) {
  let route = "/";
  try {
    const session = await getAuthSession();

    if (!session) {
      redirect("/sign-in");
    }

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    const parsedInput = serverCreationSchema.safeParse({ name, image });

    if (!parsedInput.success) {
      const errorType = parsedInput.error.errors[0]?.path[0];
      console.log(errorType);
      return { msg: errorType };
    }

    const serverCreated = await db.server.create({
      data: { name: name, image: image, creatorId: session.user.id },
    });

    if (!serverCreated.id) {
      return { msg: "error" };
    }

    const channelCreated = await db.channel.create({
      data: {
        name: "general",
        type: "text",
        creatorId: session.user.id,
        serverId: serverCreated.id,
      },
    });

    if (!channelCreated.id) {
      return { msg: "error" };
    }

    route = `/server/${serverCreated.id}/channel/${channelCreated.id}`;
    revalidatePath("/");
    revalidatePath(route);
  } catch (error) {
    console.log(error);
  }
  redirect(route);
}
