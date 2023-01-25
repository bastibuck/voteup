import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  DeleteItemSchema,
  NewItemSchema,
  VoteItemSchema,
} from "../../../utils/schemas";

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
          creator: input.creator || "anonymous",
          admin: input.admin,
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
    .input(VoteItemSchema)
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.item.findFirstOrThrow({
        where: {
          id: input.itemId,
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
          id: input.itemId,
        },
        data: {
          votes: {
            push: input.user,
          },
        },
      });
    }),

  deleteById: publicProcedure
    .input(DeleteItemSchema)
    .mutation(async ({ input, ctx }) => {
      const item = await ctx.prisma.item.findFirstOrThrow({
        where: {
          id: input.itemId,
        },
      });

      if (item.admin !== input.admin) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.prisma.group.update({
        where: {
          id: item.groupId,
        },
        data: {
          lastVote: new Date(),
        },
      });

      return ctx.prisma.item.delete({
        where: {
          id: input.itemId,
        },
      });
    }),
});
