import { z } from "zod";
import { generateId } from "../../../utils/id";
import { NewGroupSchema } from "../../../utils/schemas";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const group = await ctx.prisma.group.findFirstOrThrow({
      where: {
        id: input,
      },
      include: {
        items: true,
      },
    });

    return {
      ...group,
      items: group.items.map((item) => ({
        ...item,
        voteCount: item.votes.length,
      })),
    };
  }),

  create: publicProcedure.input(NewGroupSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.group.create({
      data: {
        name: input.name,
        description: input.description,
        groupId: generateId(10),
        admin: input.admin,
      },
      select: {
        groupId: true,
      },
    });
  }),
});
