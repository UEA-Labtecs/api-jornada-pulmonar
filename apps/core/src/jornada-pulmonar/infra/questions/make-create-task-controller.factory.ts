import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { CreateQuestionController } from '../../presentation/handle/create-task.handle';
import { CreateQuestionDto } from '../../presentation/dto/create-task.dto';

export const makeCreateQuestionController = (body: CreateQuestionDto) => {
  const repository = new QuestionRepository();
  const service = new QuestionsUseCase(repository);
  return new CreateQuestionController(service, body);
};
