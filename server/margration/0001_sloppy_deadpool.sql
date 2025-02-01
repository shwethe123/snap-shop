CREATE TYPE "public"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "roles" "roles" DEFAULT 'user';