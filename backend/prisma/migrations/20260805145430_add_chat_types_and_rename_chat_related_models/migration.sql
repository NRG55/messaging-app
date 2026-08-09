/*
  Warnings:

  - You are about to drop the `ChatParticipant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('DIRECT', 'GROUP', 'PUBLIC');

-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatParticipant" DROP CONSTRAINT "ChatParticipant_userId_fkey";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "name" TEXT,
ADD COLUMN     "type" "ChatType" NOT NULL;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bio" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "ChatParticipant";

-- CreateTable
CREATE TABLE "ChatMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatMember_userId_chatId_key" ON "ChatMember"("userId", "chatId");

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
