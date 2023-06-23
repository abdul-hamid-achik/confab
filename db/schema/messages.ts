import { InferModel } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    roomId: integer("room_id").notNull(),
    content: text("content").notNull(),
    timestamp: timestamp("timestamp"),
  },
  (table) => ({
    userIdIndex: index("message_user_id_index").on(table.userId),
    roomIdIndex: index("message_room_id_index").on(table.roomId),
  })
)

export const SelectMessage = createSelectSchema(messages)
export const CreateMessage = createInsertSchema(messages)

export type Message = InferModel<typeof messages>
export type NewMessage = InferModel<typeof messages, "insert">
