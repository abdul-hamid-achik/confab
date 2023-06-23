import { InferModel, relations } from "drizzle-orm"
import { index, pgTable, text, uuid } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { invites } from "./invites"
import { participants } from "./participants"

export const rooms = pgTable(
  "rooms",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    topic: text("topic"),
    description: text("description"),
    moderatorId: text("moderator_id"),
  },
  (table) => ({
    moderatorIdIndex: index("moderator_id_index").on(table.moderatorId),
  })
)

export const roomsRelations = relations(rooms, ({ many }) => ({
  participants: many(participants),
  invites: many(invites),
}))

export const SelectRoom = createSelectSchema(rooms)
export const CreateRoom = createInsertSchema(rooms)

export type Room = InferModel<typeof rooms>
export type NewRoom = InferModel<typeof rooms, "insert">
