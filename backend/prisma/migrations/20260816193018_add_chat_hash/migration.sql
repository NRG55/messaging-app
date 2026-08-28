/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_hash_key" ON "Chat"("hash");
