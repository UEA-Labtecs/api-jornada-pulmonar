
import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { FindAllQuestionController } from '../../presentation/handle/questions/find-all-task.handle';
import { Questions } from '../../domain/questions/question.entity';
import { ModulesRepository } from '../../application/modules/modules-repository';
import { UploadsUseCase } from '../../application/upload/upload.use-case';
import { OptionsRepository } from '../../application/options/options-repository';
import { ResponsesRepository } from '../../application/response/response-repository';

export const makeFindAllQuestionController = (query: Questions) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const repositoryOp = new OptionsRepository();
  const repositoryRes = new ResponsesRepository();

  const uploadeUseCase = new UploadsUseCase();
  const service = new QuestionsUseCase(repository, repositoryMod, repositoryOp, repositoryRes, uploadeUseCase);
  return new FindAllQuestionController(service, query);
};
