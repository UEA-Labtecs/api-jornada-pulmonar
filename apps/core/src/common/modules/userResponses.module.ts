import { Module } from '@nestjs/common';
import { UserResponsesRepository } from '../../jornada-pulmonar/application/user-reponse/user-response-repository';
import { UserResponsesUseCase } from '../../jornada-pulmonar/application/user-reponse/user-response.use-case';
import { UserResponsesController } from '../../jornada-pulmonar/presentation/user-responses.controller';

@Module({
  controllers: [UserResponsesController],
  providers: [UserResponsesRepository, UserResponsesUseCase],
  exports: [UserResponsesRepository, UserResponsesUseCase],
})
export class UserResponsesModule {}
