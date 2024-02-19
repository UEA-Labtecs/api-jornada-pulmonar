import { BaseRepository } from '@lib/database';
import { Controller } from '../../../common/http/controller';
import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { FindAllQuestionController } from '../../presentation/handle/questions/find-all-task.handle';
import { Questions } from '../../domain/questions/question.entity';

export const makeFindAllQuestionController = (query: Questions) => {
  const repository = new QuestionRepository();
  const service = new QuestionsUseCase(repository);
  return new FindAllQuestionController(service, query);
};
