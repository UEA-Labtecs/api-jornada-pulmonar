import { ModulesRepository } from '../../application/modules/modules-repository';
import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { DeleteQuestionController } from '../../presentation/handle/questions/delete-task.handle';

export const makeDeleteQuestionController = (id: string) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const service = new QuestionsUseCase(repository, repositoryMod);
  return new DeleteQuestionController(service, id);
};
