import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

import { prisma } from "../../server/db";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const staleDate = new Date();
    staleDate.setDate(staleDate.getDate() - env.STALE_AFTER_DAYS);

    const staleGroups = await prisma.group.deleteMany({
      where: {
        lastVote: {
          lt: staleDate,
        },
      },
    });

    res.status(200).json({
      message: `Housekeeping successful. Cleaned up ${staleGroups.count} groups`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error cleaning the house..." });
  }
}
