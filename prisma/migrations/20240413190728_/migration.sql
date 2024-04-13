/*
  Warnings:

  - Added the required column `weight` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "weight" INTEGER NOT NULL;
