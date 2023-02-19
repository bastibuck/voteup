import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { generateId } from "../../../utils/id";
import {
  DeleteGroupSchema,
  NewGroupSchema,
  UserGroupsSchema,
} from "../../../utils/schemas";
import { publicGroupSelect } from "../../../utils/selectors";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ groupId: z.string(), userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { admin, ...group } = await ctx.prisma.group.findFirstOrThrow({
        where: {
          groupId: input.groupId,
        },
        select: {
          ...publicGroupSelect,
          admin: true,
          items: {
            select: {
              ...publicGroupSelect.items.select,
              admin: true,
            },
          },
        },
      });

      return {
        ...group,
        isAdmin: admin === input.userId,
        items: group.items.map(({ admin, ...item }) => ({
          ...item,
          isCreator: admin === input.userId,
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

  getAllUserGroups: publicProcedure
    .input(UserGroupsSchema)
    .query(({ input, ctx }) => {
      return ctx.prisma.group.findMany({
        where: {
          admin: input.admin,
        },
        select: publicGroupSelect,
      });
    }),

  deleteById: publicProcedure
    .input(DeleteGroupSchema)
    .mutation(async ({ input, ctx }) => {
      const group = await ctx.prisma.group.findFirstOrThrow({
        where: {
          groupId: input.groupId,
        },
      });

      if (group.admin !== input.admin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not allowed to delete item",
        });
      }

      // don't allow deleting un-administered groups
      if (group.admin === "NO_ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Not allowed to delete item",
        });
      }

      return ctx.prisma.group.delete({
        where: {
          id: group.id,
        },
        select: {
          id: true,
        },
      });
    }),
});
