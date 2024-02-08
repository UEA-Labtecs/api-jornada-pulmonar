-- DropForeignKey
ALTER TABLE "Modules" DROP CONSTRAINT "Modules_userId_fkey";

-- DropForeignKey
ALTER TABLE "Options" DROP CONSTRAINT "Options_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Questions" DROP CONSTRAINT "Questions_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Responses" DROP CONSTRAINT "Responses_choiceId_fkey";

-- DropForeignKey
ALTER TABLE "Responses" DROP CONSTRAINT "Responses_questionId_fkey";

-- AddForeignKey
ALTER TABLE "Modules" ADD CONSTRAINT "Modules_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responses" ADD CONSTRAINT "Responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
