import { QuestionRepository } from '../../application/questions/question-repository';
import { UserResponsesRepository } from '../../application/user-reponse/user-response-repository';
import { UsersRepository } from '../../application/users/users-repository';
import { UsersUseCase } from '../../application/users/users.use-case';
import { RankingUsersController } from '../../presentation/handle/users/ranking-users.handle';

export const makeRankingUsersController = (query) => {
  const repository = new UsersRepository();
  const repositoryMod = new QuestionRepository();
  const repositoryOp = new UserResponsesRepository();

  const useCase = new UsersUseCase(repository, repositoryMod, repositoryOp);
  return new RankingUsersController(useCase, query);
};
