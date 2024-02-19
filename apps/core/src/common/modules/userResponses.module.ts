import { Module } from '@nestjs/common';
import { UserResponsesRepository } from '../../jornada-pulmonar/application/user-reponse/user-response-repository';


@Module({
  providers: [
    UserResponsesRepository
  ],

})
export class UserResponsesModule { }
