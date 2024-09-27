import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const UsersTable = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateUUID()),
  name: text("name", { length: 50 }).notNull(),
  email: text("email", { length: 50 }).notNull().unique(),
  password: text("password").notNull(),
});
