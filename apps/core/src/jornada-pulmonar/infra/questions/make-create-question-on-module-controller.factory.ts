import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { CreateQuestionController } from '../../presentation/handle/questions/create-task.handle';
import { CreateQuestionDto } from '../../presentation/dto/create-task.dto';
import { ModulesRepository } from '../../application/modules/modules-repository';
import { CreateQuestionOnModuleController } from '../../presentation/handle/questions/create-question-on-module.handle';
import { OptionsRepository } from '../../application/options/options-repository';
import { ResponsesRepository } from '../../application/response/response-repository';
import { UploadsUseCase } from '../../application/upload/upload.use-case';

export const makeCreateQuestionOnModuleController = (payload: any,) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const repositoryOp = new OptionsRepository();
  const repositoryRes = new ResponsesRepository();

  const uploadeUseCase = new UploadsUseCase();
  const service = new QuestionsUseCase(repository, repositoryMod, repositoryOp, repositoryRes, uploadeUseCase);
  return new CreateQuestionOnModuleController(service, payload);
};
