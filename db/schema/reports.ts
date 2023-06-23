import { InferModel } from "drizzle-orm"
import { index, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const reportTypeEnum = pgEnum("report_type", [
  "spam",
  "harassment",
  "hate_speech",
  "nudity",
  "violence",
])

export const reports = pgTable(
  "reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(),
    targetId: text("target_id").notNull(),
    type: reportTypeEnum("report_type").notNull(),
    reason: text("reason"),
  },
  (table) => ({
    userIdIndex: index("reports_user_id_index").on(table.userId),
    targetIdIndex: index("reports_target_id_index").on(table.targetId),
  })
)

export const SelectReport = createSelectSchema(reports)
export const CreateReport = createInsertSchema(reports)

export type Report = InferModel<typeof reports>
export type NewReport = InferModel<typeof reports, "insert">
