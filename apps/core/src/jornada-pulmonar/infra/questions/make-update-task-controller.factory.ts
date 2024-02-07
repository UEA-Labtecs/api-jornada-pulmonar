import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { UpdateQuestionController } from '../../presentation/handle/update-task.handle';
import { UpdateQuestionDto } from '../../presentation/dto/update-task.dto';

export const makeUpdateQuestionController = (id: string, body: UpdateQuestionDto) => {
  const repository = new QuestionRepository();
  const useCase = new QuestionsUseCase(repository);
  return new UpdateQuestionController(useCase, id, body);
};
