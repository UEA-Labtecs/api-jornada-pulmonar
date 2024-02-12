import { UsersRepository } from "../../application/users/users-repository";
import { UsersUseCase } from "../../application/users/users.use-case";
import { CreateUsersController } from "../../presentation/handle/users/create-users.handle";


export const makeCreateUsersController = (body: any) => {
  const repository = new UsersRepository();
  const useCase = new UsersUseCase(repository);
  return new CreateUsersController(useCase, body);
};
