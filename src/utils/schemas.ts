import { z } from "zod";

export const NewGroupSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),
  description: z.string().optional(),
});

export const NewItemSchema = z.object({
  group: z.string(),
  text: z.string().min(3, "Text must contain at least 3 characters"),
});
