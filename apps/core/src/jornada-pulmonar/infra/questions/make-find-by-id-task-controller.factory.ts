
import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { FindByIdQuestionController } from '../../presentation/handle/questions/find-by-id-task.handle';

export const makeFindByIdQuestionController = (id: string) => {
  const repository = new QuestionRepository();

  const service = new QuestionsUseCase(repository);
  return new FindByIdQuestionController(service, id);
};
