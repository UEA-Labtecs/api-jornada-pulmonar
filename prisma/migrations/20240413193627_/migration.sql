/*
  Warnings:

  - Added the required column `imgNameUrl` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "imgNameUrl" TEXT NOT NULL;
