import { InferModel } from "drizzle-orm"
import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const settings = pgTable(
  "settings",
  {
    id: serial("id"),
    userId: text("user_id").notNull(),
    createdAt: timestamp("created_at"),
    updatedAt: timestamp("updated_at"),
  },
  (table) => ({
    userIdIndex: uniqueIndex("settings_unique_user_id_index").on(table.userId),
  })
)

export const SelectSetting = createSelectSchema(settings)
export const CreateSetting = createInsertSchema(settings)

export type Setting = InferModel<typeof settings>
export type NewSetting = InferModel<typeof settings, "insert">
