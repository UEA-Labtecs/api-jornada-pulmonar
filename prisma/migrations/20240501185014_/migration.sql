/*
  Warnings:

  - You are about to drop the column `imgNameUrl` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Questions` table. All the data in the column will be lost.
  - You are about to drop the column `imgNameUrl` on the `Users` table. All the data in the column will be lost.
  - Added the required column `imageBase64` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageBase64` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "imgNameUrl",
DROP COLUMN "weight",
ADD COLUMN     "imageBase64" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "imgNameUrl",
ADD COLUMN     "imageBase64" TEXT NOT NULL;
