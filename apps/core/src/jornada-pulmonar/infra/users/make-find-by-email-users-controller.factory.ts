import { UsersRepository } from "../../application/users/users-repository";
import { UsersUseCase } from "../../application/users/users.use-case";
import { FindByEmailUsersController } from "../../presentation/handle/users/find-by-id-users.handle";


export const makeFindByEmailUsersController = (email: string) => {
  const repository = new UsersRepository();
  const useCase = new UsersUseCase(repository);
  return new FindByEmailUsersController(useCase, email);
};
