/*
  Warnings:

  - Added the required column `isCorrect` to the `UserResponses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserResponses" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL;
