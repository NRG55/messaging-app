/*
  Warnings:

  - A unique constraint covering the columns `[normalizedUsername]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizedUsername` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "normalizedUsername" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_normalizedUsername_key" ON "User"("normalizedUsername");
