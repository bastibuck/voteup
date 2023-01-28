import type { PrismaClient } from "@prisma/client";

export async function run(prisma: PrismaClient) {
  const groups = await prisma.group.findRaw({
    filter: {
      admin: {
        $exists: false,
      },
    },
  });

  console.log(groups);
}
