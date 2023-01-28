import { z } from "zod";
import { generateId } from "../../../utils/id";
import { NewGroupSchema } from "../../../utils/schemas";
import { publicGroupSelect } from "../../../utils/selectors";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ groupId: z.string(), userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { admin, ...group } = await ctx.prisma.group.findFirstOrThrow({
        where: {
          id: input.groupId,
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
});
