import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const rooms = pgTable('rooms', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  topic: text('topic'),
  description: text('description'),
  moderatorId: text('moderator_id'),
}, (table) => ({
  moderatorIdIndex: index("moderator_id_index").on(table.moderatorId)
}));


export const getRoom = createSelectSchema(rooms);
export const newRoom = createInsertSchema(rooms);
