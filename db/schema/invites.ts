import { InferModel, relations } from 'drizzle-orm';
import { index, pgEnum, pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { rooms } from './rooms';

export const inviteStatusEnum = pgEnum('invite_status', ['pending', 'accepted', 'declined']);

export const invites = pgTable('invites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  roomId: uuid('room_id').notNull(),
  status: inviteStatusEnum('status').notNull().default('pending'),
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

export const getInvite = createSelectSchema(invites);
export const newInvite = createInsertSchema(invites);
