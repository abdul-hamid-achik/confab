import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const settings = pgTable("settings", {
  id: serial("id"),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
}, (table) => ({
  userIdIndex: uniqueIndex("settings_unique_user_id_index").on(table.userId),
}));
