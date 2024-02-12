/*
  Warnings:

  - Added the required column `responseTime` to the `Responses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Responses" ADD COLUMN     "responseTime" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;
