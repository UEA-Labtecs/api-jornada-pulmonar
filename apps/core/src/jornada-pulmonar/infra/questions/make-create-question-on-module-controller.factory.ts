import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { CreateQuestionController } from '../../presentation/handle/questions/create-task.handle';
import { CreateQuestionDto } from '../../presentation/dto/create-task.dto';
import { ModulesRepository } from '../../application/modules/modules-repository';
import { CreateQuestionOnModuleController } from '../../presentation/handle/questions/create-question-on-module.handle';
import { OptionsRepository } from '../../application/options/options-repository';
import { ResponsesRepository } from '../../application/response/response-repository';

export const makeCreateQuestionOnModuleController = (body: CreateQuestionDto) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const repositoryOp = new OptionsRepository();
  const repositoryRes = new ResponsesRepository();
  const service = new QuestionsUseCase(repository, repositoryMod, repositoryOp, repositoryRes);
  return new CreateQuestionOnModuleController(service, body);
};
