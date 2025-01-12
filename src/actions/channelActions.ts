"use server";

import { getAuthSession } from "@/server/auth/config";
import { db } from "@/server/db";
import { channelCreationSchema, serverCreationSchema } from "@/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createNewChannelAction(
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
    const type = formData.get("type") as string;
    const serverId = formData.get("serverId") as string;

    const parsedInput = channelCreationSchema.safeParse({ name, type });

    if (!parsedInput.success) {
      const errorType = parsedInput.error.errors[0]?.path[0];
      console.log(errorType);
      return { msg: errorType };
    }

    const channelCreated = await db.channel.create({
      data: {
        name: name,
        type: type,
        creatorId: session.user.id,
        serverId: serverId,
      },
    });

    if (!channelCreated.id) {
      return { msg: "error" };
    }

    route = `/server/${serverId}/channel/${channelCreated.id}`;
    revalidatePath("/");
    revalidatePath(route);
  } catch (error) {
    console.log(error);
  }
  redirect(route);
}
