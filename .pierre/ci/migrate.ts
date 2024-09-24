import { run } from "pierre";

export const label = "Migrate DB";

export default async ({ branch }) => {
  if (branch.name !== "main") {
    await run('echo "Skipping DB Migration on non-main branches 🚫"');
  } else {
    await run("cd packages/db && pnpm prisma:migrate");
  }
};
