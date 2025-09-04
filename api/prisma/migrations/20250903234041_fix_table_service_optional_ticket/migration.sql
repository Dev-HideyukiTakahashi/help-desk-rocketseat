-- DropForeignKey
ALTER TABLE "public"."services" DROP CONSTRAINT "services_ticketId_fkey";

-- AlterTable
ALTER TABLE "public"."services" ALTER COLUMN "ticketId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."services" ADD CONSTRAINT "services_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."tickets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
