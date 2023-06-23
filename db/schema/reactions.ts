import { InferModel } from "drizzle-orm"
import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const typeEnum = pgEnum("reaction_type", [
  "like",
  "dislike",
  "laugh",
  "sad",
  "angry",
  "love",
  "wow",
])

export const reactions = pgTable(
  "reactions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id"),
    messageId: integer("message_id"),
    type: typeEnum("reaction_type"),
  },
  (table) => ({
    userIdIndex: index("reaction_user_id_index").on(table.userId),
    messageIdIndex: index("reaction_message_id_index").on(table.messageId),
  })
)

export const SelectReaction = createSelectSchema(reactions)
export const CreateReaction = createInsertSchema(reactions)

export type Reaction = InferModel<typeof reactions>
export type NewReaction = InferModel<typeof reactions, "insert">
