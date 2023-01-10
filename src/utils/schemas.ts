import { z } from "zod";

export const NewGroupSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const NewItemSchema = z.object({
  group: z.string(),
  text: z.string(),
});
