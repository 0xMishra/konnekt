import { z } from "zod";

export const serverCreationSchema = z.object({
  name: z.string().min(3),
  image: z.string().optional(),
});

export type ServerCreationType = z.infer<typeof serverCreationSchema>;
