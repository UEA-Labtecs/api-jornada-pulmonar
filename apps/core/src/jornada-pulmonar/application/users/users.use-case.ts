import { Injectable } from '@nestjs/common';
import { Users } from '../../domain/users/users.entity';
import { UsersRepository } from './users-repository';
import { IUsersUseCase } from '../../domain/users/users.use-case.contract';

@Injectable()
export class UsersUseCase implements IUsersUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async createUser(data: Users) {
    //regra de negócio
    return await this.usersRepository.create(new Users(data))
  };

  async updateUser(id: string, data: Users) {
    //regra de negócio
    return await this.usersRepository.update(id, data)
  };

  async findAllUser(query): Promise<Users[]> {
    //regra de negócio
    return this.usersRepository.findAll(query)
  }

  async deleteUser(id: string): Promise<void> {
    //regra de negócio
    return await this.usersRepository.delete(id)
  }
}
