import { readdirSync, unlinkSync } from "fs";
import { PrismaClient } from "@prisma/client";
import { exit } from "process";

export type Migration = {
  run: (prisma: PrismaClient) => void;
};

const [dev] = process.argv.slice(2);

const files = readdirSync("./prisma/migrations").filter((file) =>
  file.includes(".migration.ts")
);

if (files.length === 0) {
  console.log("No migrations to run. Exiting...");
  exit(0);
}

const prisma = new PrismaClient();

for (const file of files) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const migration = require("../prisma/migrations/" + file) as Migration;

  migration.run(prisma);

  if (dev !== "--dev") {
    unlinkSync("./prisma/migrations/" + file);
  }

  console.log(`🚀 ~ Ran migration ${file}`);
}
