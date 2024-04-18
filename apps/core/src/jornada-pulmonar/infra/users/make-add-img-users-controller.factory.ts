import { UsersRepository } from "../../application/users/users-repository";
import { UsersUseCase } from "../../application/users/users.use-case";
import { AddImgUsersController } from "../../presentation/handle/users/add-img-user-users.handle";


export const makeAddImgUsersController = (id: string, file: any) => {
  const repository = new UsersRepository();
  const useCase = new UsersUseCase(repository);
  return new AddImgUsersController(useCase, id, file);
};
