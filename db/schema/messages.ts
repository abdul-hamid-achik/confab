import { index, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  roomId: integer('room_id').notNull(),
  content: text('content').notNull(),
  timestamp: timestamp('timestamp'),
}, (table) => ({
  userIdIndex: index("message_user_id_index").on(table.userId),
  roomIdIndex: index("message_room_id_index").on(table.roomId),
}));
