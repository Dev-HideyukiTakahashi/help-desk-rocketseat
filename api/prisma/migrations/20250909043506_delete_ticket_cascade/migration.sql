-- DropForeignKey
ALTER TABLE "public"."tickets" DROP CONSTRAINT "tickets_clientId_fkey";

-- AddForeignKey
ALTER TABLE "public"."tickets" ADD CONSTRAINT "tickets_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
