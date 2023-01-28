import { copyFileSync } from "fs";
import { exit } from "process";

const [name] = process.argv.slice(2);

if (!name) {
  console.error("No name provided. Run 'migration-create new-migration-name'");
  exit(1);
}

copyFileSync(
  "./.migrations/example.migration.example.ts",
  `./prisma/migrations/${name}.migration.ts`
);

console.log(
  `🚀 Migration created. Add migration logic to ./prisma/migrations/${name}.migration.ts`
);
