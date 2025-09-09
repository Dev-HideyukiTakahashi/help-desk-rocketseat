/*
  Warnings:

  - The primary key for the `_TicketServices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `tickets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_TicketServices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."_TicketServices" DROP CONSTRAINT "_TicketServices_B_fkey";

-- AlterTable
ALTER TABLE "public"."_TicketServices" DROP CONSTRAINT "_TicketServices_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL,
ADD CONSTRAINT "_TicketServices_AB_pkey" PRIMARY KEY ("A", "B");

-- AlterTable
ALTER TABLE "public"."tickets" DROP CONSTRAINT "tickets_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "_TicketServices_B_index" ON "public"."_TicketServices"("B");

-- AddForeignKey
ALTER TABLE "public"."_TicketServices" ADD CONSTRAINT "_TicketServices_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
