import { QuestionRepository } from "../../application/questions/question-repository";
import { UploadsUseCase } from "../../application/upload/upload.use-case";
import { UserResponsesRepository } from "../../application/user-reponse/user-response-repository";
import { UsersRepository } from "../../application/users/users-repository";
import { UsersUseCase } from "../../application/users/users.use-case";
import { CreateUsersController } from "../../presentation/handle/users/create-users.handle";


export const makeCreateUsersController = (body: any) => {
  const repositoryUser = new UsersRepository();
  const repositoryQuestion = new QuestionRepository()
  const userResponsesRepository = new UserResponsesRepository()
  const payloadUseCase = new UploadsUseCase();
  const useCase = new UsersUseCase(repositoryUser, repositoryQuestion, userResponsesRepository, payloadUseCase);
  return new CreateUsersController(useCase, body);
};
