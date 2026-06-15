import { config } from "@repo/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "db/schema.db",
  migrations: {
    path: "db/migrations",
  },
  datasource: {
    url: config.DATABASE_URL,
  },
});
