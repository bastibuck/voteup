import { z } from "zod";
import { NewGroupSchema } from "../../../utils/schemas";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const groupRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.group.findFirst({
      where: {
        id: input,
      },
      include: {
        items: {
          orderBy: {
            votes: "desc",
          },
        },
      },
    });
  }),

  create: publicProcedure.input(NewGroupSchema).mutation(({ input, ctx }) => {
    return ctx.prisma.group.create({
      data: {
        name: input.name,
        description: input.description,
      },
      select: {
        id: true,
      },
    });
  }),
});
