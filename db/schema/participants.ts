import { InferModel, relations } from "drizzle-orm"
import { index, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { rooms } from "./rooms"

export const participantStatusEnum = pgEnum("participant_status", [
  "connected",
  "disconnected",
])

export const roleEnum = pgEnum("participant_role", [
  "speaker",
  "moderator",
  "listener",
])

export const participants = pgTable(
  "participants",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    roomId: text("room_id").notNull(),
    inviteId: text("invite_id"),
    role: roleEnum("role").notNull().default("listener"),
    status: participantStatusEnum("status").notNull().default("disconnected"),
  },
  (table) => ({
    userIdIndex: index("participant_user_id_index").on(table.userId),
    inviteIdIndex: index("participant_invite_id_index").on(table.inviteId),
    roomIdIndex: index("participant_room_id_index").on(table.roomId),
  })
)

export const participantsRelations = relations(participants, ({ one }) => ({
  room: one(rooms, {
    fields: [participants.roomId],
    references: [rooms.id],
  }),
  invite: one(rooms, {
    fields: [participants.inviteId],
    references: [rooms.id],
  }),
}))

export const SelectParticipant = createSelectSchema(participants)
export const CreateParticipant = createInsertSchema(participants)

export type Participant = InferModel<typeof participants>
export type NewParticipant = InferModel<typeof participants, "insert">
