import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { DeleteQuestionController } from '../../presentation/handle/questions/delete-task.handle';

export const makeDeleteQuestionController = (id: string) => {
  const repository = new QuestionRepository();
  const useCase = new QuestionsUseCase(repository);
  return new DeleteQuestionController(useCase, id);
};
