/*
  Warnings:

  - Added the required column `imgNameUrl` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "imgNameUrl" TEXT NOT NULL;
