-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('FREELANCER', 'EMPLOYER', 'NOT_SET');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balance" TEXT,
ADD COLUMN     "cus_id" TEXT,
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'NOT_SET';
