import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);

// Test the connection
sql`SELECT 1`
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

export const db = drizzle(sql, { schema });
