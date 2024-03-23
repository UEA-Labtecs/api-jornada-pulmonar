
import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { FindAllQuestionController } from '../../presentation/handle/questions/find-all-task.handle';
import { Questions } from '../../domain/questions/question.entity';
import { ModulesRepository } from '../../application/modules/modules-repository';

export const makeFindAllQuestionController = (query: Questions) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const service = new QuestionsUseCase(repository, repositoryMod);
  return new FindAllQuestionController(service, query);
};
