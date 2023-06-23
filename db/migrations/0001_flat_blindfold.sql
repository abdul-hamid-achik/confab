ALTER TABLE "invites" RENAME COLUMN "user_id" TO "email";
DROP INDEX IF EXISTS "invite_user_id_index";
DROP INDEX IF EXISTS "invite_user_id_room_id_unique_index";
ALTER TABLE "participants" ADD COLUMN "invite_id" text;
CREATE INDEX IF NOT EXISTS "invite_email_index" ON "invites" ("email");
CREATE INDEX IF NOT EXISTS "participant_invite_id_index" ON "participants" ("invite_id");
CREATE UNIQUE INDEX IF NOT EXISTS "invite_user_id_room_id_unique_index" ON "invites" ("email","room_id");