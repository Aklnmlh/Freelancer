/*
  Warnings:

  - Made the column `isTaken` on table `Jobs` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('WAITING_FOR_PAYMENT', 'PAID');

-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN     "status" "JobType" NOT NULL DEFAULT 'WAITING_FOR_PAYMENT',
ALTER COLUMN "isTaken" SET NOT NULL;
