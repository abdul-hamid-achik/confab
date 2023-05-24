import { InferModel, relations } from 'drizzle-orm';
import { index, pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core";
import { rooms } from './rooms';

export const invites = pgTable('invites', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  roomId: text('room_id').notNull(),
}, (table) => ({
  userIdIndex: index("invite_user_id_index").on(table.userId),
  roomIdIndex: index("invite_room_id_index").on(table.roomId),
  userIdRoomIdUniqueIndex: uniqueIndex("invite_user_id_room_id_unique_index").on(table.userId, table.roomId),
}));

export const invitesRelations = relations(invites, ({ one }) => ({
  room: one(rooms, {
    fields: [
      invites.roomId
    ],
    references: [
      rooms.id
    ]
  })
}));

export type Invite = InferModel<typeof invites, "select">;
export type NewInvite = InferModel<typeof invites, "insert">;
