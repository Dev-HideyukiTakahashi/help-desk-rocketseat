/*
  Warnings:

  - You are about to drop the column `ticketId` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."services" DROP CONSTRAINT "services_ticketId_fkey";

-- AlterTable
ALTER TABLE "public"."services" DROP COLUMN "ticketId";

-- CreateTable
CREATE TABLE "public"."_TicketServices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TicketServices_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TicketServices_B_index" ON "public"."_TicketServices"("B");

-- AddForeignKey
ALTER TABLE "public"."_TicketServices" ADD CONSTRAINT "_TicketServices_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_TicketServices" ADD CONSTRAINT "_TicketServices_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
