//0RTbd8zoZyra
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./utils/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
