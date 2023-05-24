import { index, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const participantStatusEnum = pgEnum('participant_status', ['connected', 'disconnected']);

export const roleEnum = pgEnum('participant_role', ['speaker', 'moderator', 'listener']);

export const participants = pgTable('participants', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  roomId: text('room_id').notNull(),
  role: roleEnum('role').notNull().default('listener'),
  status: participantStatusEnum('status').notNull().default('disconnected'),
}, (table) => ({
  userIdIndex: index("participant_user_id_index").on(table.userId),
  roomIdIndex: index("participant_room_id_index").on(table.roomId),
}));
