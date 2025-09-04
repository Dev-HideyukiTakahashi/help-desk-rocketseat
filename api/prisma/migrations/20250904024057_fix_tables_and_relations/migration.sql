/*
  Warnings:

  - You are about to drop the column `userId` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `availabilities` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `availabilities` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `technicians` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `admins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technicianId,time]` on the table `availabilities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `technicians` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `availabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `technicians` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `technicians` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `technicians` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `technicians` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."admins" DROP CONSTRAINT "admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."clients" DROP CONSTRAINT "clients_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."technicians" DROP CONSTRAINT "technicians_userId_fkey";

-- DropIndex
DROP INDEX "public"."admins_userId_key";

-- DropIndex
DROP INDEX "public"."availabilities_technicianId_key";

-- DropIndex
DROP INDEX "public"."clients_userId_key";

-- DropIndex
DROP INDEX "public"."technicians_userId_key";

-- AlterTable
ALTER TABLE "public"."admins" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "public"."Role" NOT NULL;

-- AlterTable
ALTER TABLE "public"."availabilities" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."clients" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "public"."Role" NOT NULL;

-- AlterTable
ALTER TABLE "public"."technicians" DROP COLUMN "userId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "public"."Role" NOT NULL;

-- DropTable
DROP TABLE "public"."users";

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "public"."admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "availabilities_technicianId_time_key" ON "public"."availabilities"("technicianId", "time");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "public"."clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "technicians_email_key" ON "public"."technicians"("email");
