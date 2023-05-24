import { env } from '@/env.mjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(env.POSTGRES_URL, {
  idle_timeout: 5,
  ssl: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV !== 'production',
});
export const db = drizzle(client, {
});
