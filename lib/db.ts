import { env } from '@/env.mjs';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.NODE_ENV === 'production' ? `${env.POSTGRES_URL}&sslmode=require` : env.POSTGRES_URL);
export const db = drizzle(client, {});
