
import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

dotenv.config();

console.log(`Migrating database at ${process.env.POSTGRES_URL}`);

const migrationClient = postgres(process.env.POSTGRES_URL as string, { max: 1 });

migrate(drizzle(migrationClient), {
  migrationsFolder: './db/migrations',
}).then(() => {
  console.log('Migration complete');
  migrationClient.end();
}).catch((error) => console.error(error));

