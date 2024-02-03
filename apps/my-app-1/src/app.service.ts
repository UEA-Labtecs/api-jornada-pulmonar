import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user-entity';
import { AppRepository } from './repositories/app.repository';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async createUser(data: UserEntity): Promise<UserEntity> {
    // await this.appRepository.create({
    //   email: 'teste@gmail.com',
    //   name: 'user2',
    //   id: 2,
    // });
    return this.appRepository.create(data);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    throw new NotFoundException('Conteúdo não encontrado');
    // return this.appRepository.findAll();
  }
}
