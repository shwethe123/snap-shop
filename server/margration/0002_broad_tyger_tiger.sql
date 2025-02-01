ALTER TABLE "user" ALTER COLUMN "emailVerified" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "emailVerified" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "isTwoFactorEnable" boolean DEFAULT false;