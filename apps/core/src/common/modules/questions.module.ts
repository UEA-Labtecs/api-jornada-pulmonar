import { Module } from '@nestjs/common';
import { QuestionController } from '../../jornada-pulmonar/presentation/question.controller';
import { QuestionRepository } from '../../jornada-pulmonar/application/questions/question-repository';

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionRepository],
})
export class QuestionModule {}
