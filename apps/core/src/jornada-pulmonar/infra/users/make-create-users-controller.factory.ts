import { QuestionRepository } from '../../application/questions/question-repository';
import { UserResponsesRepository } from '../../application/user-reponse/user-response-repository';
import { UsersRepository } from '../../application/users/users-repository';
import { UsersUseCase } from '../../application/users/users.use-case';
import { CreateUsersController } from '../../presentation/handle/users/create-users.handle';

export const makeCreateUsersController = (body: any) => {
  const repositoryUser = new UsersRepository();
  const repositoryQuestion = new QuestionRepository();
  const userResponsesRepository = new UserResponsesRepository();
  // const payloadUseCase = new UploadsUseCase(); // 4º parâmetro comentado no UsersUseCase
  const useCase = new UsersUseCase(
    repositoryUser,
    repositoryQuestion,
    userResponsesRepository,
  );
  return new CreateUsersController(useCase, body);
};
