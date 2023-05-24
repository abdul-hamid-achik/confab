DO $$ BEGIN
 CREATE TYPE "invite_status" AS ENUM('pending', 'accepted', 'declined');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "participant_status" AS ENUM('connected', 'disconnected');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "participant_role" AS ENUM('speaker', 'moderator', 'listener');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "reaction_type" AS ENUM('like', 'dislike', 'laugh', 'sad', 'angry', 'love', 'wow');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "report_type" AS ENUM('spam', 'harassment', 'hate_speech', 'nudity', 'violence');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "invites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"room_id" uuid NOT NULL,
	"status" invite_status DEFAULT 'pending' NOT NULL
);

CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"room_id" integer NOT NULL,
	"content" text NOT NULL,
	"timestamp" timestamp
);

CREATE TABLE IF NOT EXISTS "participants" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"room_id" text NOT NULL,
	"role" participant_role DEFAULT 'listener' NOT NULL,
	"status" participant_status DEFAULT 'disconnected' NOT NULL
);

CREATE TABLE IF NOT EXISTS "reactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"message_id" integer,
	"reaction_type" reaction_type
);

CREATE TABLE IF NOT EXISTS "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"target_id" text NOT NULL,
	"report_type" report_type NOT NULL,
	"reason" text
);

CREATE TABLE IF NOT EXISTS "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"topic" text,
	"description" text,
	"moderator_id" text
);

CREATE TABLE IF NOT EXISTS "settings" (
	"id" serial NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);

CREATE INDEX IF NOT EXISTS "invite_user_id_index" ON "invites" ("user_id");
CREATE INDEX IF NOT EXISTS "invite_room_id_index" ON "invites" ("room_id");
CREATE UNIQUE INDEX IF NOT EXISTS "invite_user_id_room_id_unique_index" ON "invites" ("user_id","room_id");
CREATE INDEX IF NOT EXISTS "message_user_id_index" ON "messages" ("user_id");
CREATE INDEX IF NOT EXISTS "message_room_id_index" ON "messages" ("room_id");
CREATE INDEX IF NOT EXISTS "participant_user_id_index" ON "participants" ("user_id");
CREATE INDEX IF NOT EXISTS "participant_room_id_index" ON "participants" ("room_id");
CREATE INDEX IF NOT EXISTS "reaction_user_id_index" ON "reactions" ("user_id");
CREATE INDEX IF NOT EXISTS "reaction_message_id_index" ON "reactions" ("message_id");
CREATE INDEX IF NOT EXISTS "reports_user_id_index" ON "reports" ("user_id");
CREATE INDEX IF NOT EXISTS "reports_target_id_index" ON "reports" ("target_id");
CREATE INDEX IF NOT EXISTS "moderator_id_index" ON "rooms" ("moderator_id");
CREATE UNIQUE INDEX IF NOT EXISTS "settings_unique_user_id_index" ON "settings" ("user_id");