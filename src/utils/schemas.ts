import { z } from "zod";

export const NewGroupSchema = z.object({
  name: z.string().min(5, "Name must contain at least 5 characters"),
  description: z.string().optional(),
});

export const NewItemSchema = z.object({
  group: z.string(),
  text: z.string(),
});
