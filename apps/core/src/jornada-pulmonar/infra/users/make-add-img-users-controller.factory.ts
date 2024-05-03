// import { QuestionRepository } from "../../application/questions/question-repository";
// import { UploadsUseCase } from "../../application/upload/upload.use-case";
// import { UserResponsesRepository } from "../../application/user-reponse/user-response-repository";
// import { UsersRepository } from "../../application/users/users-repository";
// import { UsersUseCase } from "../../application/users/users.use-case";
// import { AddImgUsersController } from "../../presentation/handle/users/add-img-user-users.handle";
// 
// 
// export const makeAddImgUsersController = (id: string, file: any) => {
//   const repositoryUser = new UsersRepository();
//   const repositoryQuestion = new QuestionRepository()
//   const userResponsesRepository = new UserResponsesRepository()
//   const payloadUseCase = new UploadsUseCase();
//   const useCase = new UsersUseCase(repositoryUser, repositoryQuestion, userResponsesRepository, payloadUseCase);
//   return new AddImgUsersController(useCase, id, file);
// };
