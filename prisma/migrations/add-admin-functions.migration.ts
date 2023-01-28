import type { PrismaClient } from "@prisma/client";

export async function run(prisma: PrismaClient) {
  // add NO_ADMIN to groups
  const groups = (await prisma.group.findRaw({
    filter: {
      admin: {
        $exists: false,
      },
    },
  })) as unknown as { _id: { $oid: string } }[];

  for await (const group of groups) {
    await prisma.group.update({
      where: {
        id: group._id.$oid,
      },
      data: {
        admin: "NO_ADMIN",
      },
    });
  }

  // add NO_ADMIN and NO_USER to items
  const items = (await prisma.item.findRaw({
    filter: {
      admin: {
        $exists: false,
      },
    },
  })) as unknown as { _id: { $oid: string }; votes: number }[];

  for await (const item of items) {
    await prisma.item.update({
      where: {
        id: item._id.$oid,
      },
      data: {
        admin: "NO_ADMIN",
        votes: new Array(item.votes).fill("NO_USER"),
      },
    });
  }
}
