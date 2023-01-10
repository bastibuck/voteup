import { z } from "zod";
import { NewItemSchema } from "../../../utils/schemas";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  getAllByGroupId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.group.findFirst({
      where: {
        id: input,
      },
      include: {
        items: true,
      },
    });
  }),

  create: publicProcedure
    .input(NewItemSchema)
    .mutation(async ({ input, ctx }) => {
      const group = await ctx.prisma.group.findFirstOrThrow({
        where: {
          id: input.group,
        },
      });

      await ctx.prisma.group.update({
        where: {
          id: group.id,
        },
        data: {
          lastVote: new Date(),
        },
      });

      return ctx.prisma.item.create({
        data: {
          text: input.text,
          group: {
            connect: {
              id: group.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
    }),

  voteUpById: publicProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.item.findFirstOrThrow({
        where: {
          id: input,
        },
      });

      await ctx.prisma.group.update({
        where: {
          id: item.groupId,
        },
        data: {
          lastVote: new Date(),
        },
      });

      return ctx.prisma.item.update({
        where: {
          id: input,
        },
        data: {
          votes: {
            increment: 1,
          },
        },
      });
    }),
});
