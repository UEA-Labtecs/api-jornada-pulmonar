import { ModulesRepository } from '../../application/modules/modules-repository';
import { OptionsRepository } from '../../application/options/options-repository';
import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { ResponsesRepository } from '../../application/response/response-repository';
import { CreateQuestionOnModuleController } from '../../presentation/handle/questions/create-question-on-module.handle';

export const makeCreateQuestionOnModuleController = (payload: any) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const repositoryOp = new OptionsRepository();
  const repositoryRes = new ResponsesRepository();

  const service = new QuestionsUseCase(
    repository,
    repositoryMod,
    repositoryOp,
    repositoryRes,
  );
  return new CreateQuestionOnModuleController(service, payload);
};
