import { index, pgEnum, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  moderatorId: text('moderator_id'),
}, (table) => ({
  moderatorIdIndex: index("moderator_id_index").on(table.moderatorId)
}));


export const roleEnum = pgEnum('role', ['speaker', 'moderator', 'listener']);

export const roomUsers = pgTable('room_users', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  roomId: text('room_id').notNull(),
  role: roleEnum('role').notNull().default('listener'),
}, (table) => ({
  userIdIndex: index("room_user_id_index").on(table.userId),
  roomIdIndex: index("room_user_room_id_index").on(table.roomId),
}));
