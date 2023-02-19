import { TRPCError } from "@trpc/server";
import {
  DeleteItemSchema,
  NewItemSchema,
  VoteItemSchema,
} from "../../../utils/schemas";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  create: publicProcedure
    .input(NewItemSchema)
    .mutation(async ({ input, ctx }) => {
      const group = await ctx.prisma.group.findFirstOrThrow({
        where: {
          groupId: input.group,
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

      if (item.votes.includes(input.user)) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Already voted for this item",
        });
      }

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
        include: {
          group: {
            select: {
              admin: true,
            },
          },
        },
      });

      if (item.admin !== input.admin && item.group.admin !== input.admin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not allowed to delete item",
        });
      }

      // don't allow deleting un-administered items
      if (item.admin === "NO_ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not allowed to delete item",
        });
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
        select: {
          id: true,
        },
      });
    }),
});
