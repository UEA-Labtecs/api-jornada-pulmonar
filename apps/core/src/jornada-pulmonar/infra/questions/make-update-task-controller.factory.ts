import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { UpdateQuestionController } from '../../presentation/handle/questions/update-task.handle';
import { UpdateQuestionDto } from '../../presentation/dto/update-task.dto';
import { ModulesRepository } from '../../application/modules/modules-repository';

export const makeUpdateQuestionController = (id: string, body: UpdateQuestionDto) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const service = new QuestionsUseCase(repository, repositoryMod);
  return new UpdateQuestionController(service, id, body);
};
