import { z } from "zod";

export const serverCreationSchema = z.object({
  name: z.string().min(3),
  image: z.string().optional(),
});

export type ServerCreationType = z.infer<typeof serverCreationSchema>;

export const channelCreationSchema = z.object({
  name: z.string().min(3),
  type: z.enum(["text", "audio", "video"]),
});

export type ChannelCreationType = z.infer<typeof channelCreationSchema>;
