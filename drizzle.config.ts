import { defineConfig } from "drizzle-kit";

/**
 * This is the configuration file for the Drizzle Kit.
 *
 * The Drizzle Kit is a tool that helps you to interact with your database
 */
export default defineConfig({
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.NUXT_TURSO_DATABASE_URL!,
    authToken: process.env.NUXT_TURSO_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
});
