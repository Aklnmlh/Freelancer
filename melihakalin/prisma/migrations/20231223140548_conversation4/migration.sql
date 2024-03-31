/*
  Warnings:

  - You are about to drop the column `latestMessageId` on the `Conversation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_latestMessageId_fkey";

-- DropIndex
DROP INDEX "Conversation_latestMessageId_key";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "latestMessageId";
