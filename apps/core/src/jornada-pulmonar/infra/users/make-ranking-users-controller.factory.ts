import { ModulesRepository } from "../../application/modules/modules-repository";
import { OptionsRepository } from "../../application/options/options-repository";
import { QuestionRepository } from "../../application/questions/question-repository";
import { QuestionsUseCase } from "../../application/questions/question.use-case";
import { ResponsesRepository } from "../../application/response/response-repository";
import { UploadsUseCase } from "../../application/upload/upload.use-case";
import { UserResponsesRepository } from "../../application/user-reponse/user-response-repository";
import { UsersRepository } from "../../application/users/users-repository";
import { UsersUseCase } from "../../application/users/users.use-case";
import { FindByEmailUsersController } from "../../presentation/handle/users/find-by-id-users.handle";
import { RankingUsersController } from "../../presentation/handle/users/ranking-users.handle";


export const makeRankingUsersController = (query) => {
  const repository = new UsersRepository();
  const repositoryMod = new QuestionRepository();
  const repositoryOp = new UserResponsesRepository();

  const uploadeUseCase = new UploadsUseCase();
  const useCase = new UsersUseCase(repository, repositoryMod, repositoryOp, uploadeUseCase);
  return new RankingUsersController(useCase, query);
};
