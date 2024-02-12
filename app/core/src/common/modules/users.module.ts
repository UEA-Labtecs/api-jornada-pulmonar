import { Module } from '@nestjs/common';
import { UsersController } from '../../jornada-pulmonar/presentation/users.controller';
import { UsersRepository } from '../../jornada-pulmonar/application/users/users-repository';

@Module({
  imports: [UsersRepository],
  controllers: [UsersController],
  providers: [
    UsersRepository
  ],
})
export class UsersModule { }
