import { ModulesRepository } from '../../application/modules/modules-repository';
import { OptionsRepository } from '../../application/options/options-repository';
import { QuestionRepository } from '../../application/questions/question-repository';
import { QuestionsUseCase } from '../../application/questions/question.use-case';
import { ResponsesRepository } from '../../application/response/response-repository';
import { UserResponsesRepository } from '../../application/user-reponse/user-response-repository';
import { Questions } from '../../domain/questions/question.entity';
import { FindAllQuestionController } from '../../presentation/handle/questions/find-all-task.handle';

export const makeFindAllQuestionController = (query: Questions) => {
  const repository = new QuestionRepository();
  const repositoryMod = new ModulesRepository();
  const repositoryOp = new OptionsRepository();
  const repositoryRes = new ResponsesRepository();

  const userResponseRep = new UserResponsesRepository();

  const service = new QuestionsUseCase(
    repository,
    repositoryMod,
    repositoryOp,
    repositoryRes,
    userResponseRep,
  );
  return new FindAllQuestionController(service, query);
};
