import { UsersRepository } from "../../application/users/users-repository";
import { UsersUseCase } from "../../application/users/users.use-case";
import { FindByEmailUsersController } from "../../presentation/handle/users/find-by-id-users.handle";
import { RankingUsersController } from "../../presentation/handle/users/ranking-users.handle";


export const makeRankingUsersController = () => {
  const repository = new UsersRepository();
  const useCase = new UsersUseCase(repository);
  return new RankingUsersController(useCase);
};
