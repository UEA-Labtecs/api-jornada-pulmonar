-- DropForeignKey
ALTER TABLE "UserResponses" DROP CONSTRAINT "UserResponses_choiceId_fkey";

-- DropForeignKey
ALTER TABLE "UserResponses" DROP CONSTRAINT "UserResponses_questionId_fkey";

-- DropForeignKey
ALTER TABLE "UserResponses" DROP CONSTRAINT "UserResponses_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserResponses" ADD CONSTRAINT "UserResponses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponses" ADD CONSTRAINT "UserResponses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserResponses" ADD CONSTRAINT "UserResponses_choiceId_fkey" FOREIGN KEY ("choiceId") REFERENCES "Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
