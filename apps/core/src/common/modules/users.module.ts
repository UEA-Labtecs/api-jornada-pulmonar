import { Module } from '@nestjs/common';
import { UsersController } from '../../jornada-pulmonar/presentation/users.controller';
import { UsersRepository } from '../../jornada-pulmonar/application/users/users-repository';
import { UsersUseCase } from '../../jornada-pulmonar/application/users/users.use-case';
import { QuestionRepository } from '../../jornada-pulmonar/application/questions/question-repository';
import { UserResponsesUseCase } from '../../jornada-pulmonar/application/user-reponse/user-response.use-case';
import { UserResponsesRepository } from '../../jornada-pulmonar/application/user-reponse/user-response-repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersRepository,
    QuestionRepository,
    UsersUseCase,
    UserResponsesUseCase,
    UserResponsesRepository
  ],
  exports: [UsersUseCase]
})
export class UsersModule { }
