/*
  Warnings:

  - You are about to drop the column `responsesId` on the `Questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "responsesId",
ADD COLUMN     "answered" BOOLEAN NOT NULL DEFAULT false;
