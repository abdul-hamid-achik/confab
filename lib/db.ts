import { env } from '@/env.mjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(env.POSTGRES_URL);
export const db = drizzle(client, {});