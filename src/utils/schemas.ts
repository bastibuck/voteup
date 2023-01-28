import { z } from "zod";

const USER_SCHEMA = z.string();

export const NewGroupSchema = z.object({
  name: z.string().min(3, "Name must contain at least 3 characters"),
  description: z.string().optional(),
  admin: USER_SCHEMA,
});

export const NewItemSchema = z.object({
  group: z.string(),
  text: z.string().min(3, "Text must contain at least 3 characters"),
  creator: z.string().optional(),
  admin: USER_SCHEMA,
});

export const VoteItemSchema = z.object({
  itemId: z.string(),
  user: USER_SCHEMA,
});

export const DeleteItemSchema = z.object({
  itemId: z.string(),
  admin: USER_SCHEMA,
});
