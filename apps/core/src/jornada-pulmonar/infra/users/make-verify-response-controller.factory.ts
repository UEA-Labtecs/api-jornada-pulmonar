import { QuestionRepository } from '../../application/questions/question-repository';
import { UserResponsesRepository } from '../../application/user-reponse/user-response-repository';
import { UsersRepository } from '../../application/users/users-repository';
import { UsersUseCase } from '../../application/users/users.use-case';
import { VerifyResponseUserController } from '../../presentation/handle/users/verify-responses.handle';

export const makeVerifyUserController = (
  opitionId: string,
  questionId: string,
  userId: string,
  time: number,
) => {
  const repositoryUser = new UsersRepository();
  const repositoryQuestion = new QuestionRepository();
  const userResponsesRepository = new UserResponsesRepository();
  const useCase = new UsersUseCase(
    repositoryUser,
    repositoryQuestion,
    userResponsesRepository,
  );
  return new VerifyResponseUserController(
    useCase,
    opitionId,
    questionId,
    userId,
    time,
  );
};
