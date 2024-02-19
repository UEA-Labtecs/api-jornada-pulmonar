import { Injectable } from '@nestjs/common';
import { Users } from '../../domain/users/users.entity';
import { UsersRepository } from './users-repository';
import { IUsersUseCase } from '../../domain/users/users.use-case.contract';
import * as bcrypt from 'bcrypt';
import { calcularPontuacao } from 'apps/core/src/common/services/calculation';
import { Questions } from '../../domain/questions/question.entity';
import { QuestionRepository } from '../questions/question-repository';
import { UserResponses } from '../../domain/user-responses/user-responses.entity';
import { UserResponsesRepository } from '../user-reponse/user-response-repository';

@Injectable()
export class UsersUseCase implements IUsersUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly questionsRepository?: QuestionRepository,
    private readonly userResponsesRepository?: UserResponsesRepository,

  ) { }

  async ranking(): Promise<Users[]> {
    return await this.usersRepository.findAll({}, {
      score: 'desc',
    });
  }

  async verifyResponse(optionId: string, questionId: string, userId: string, time: number): Promise<any> {
    const pontos = calcularPontuacao(time)

    const question: Questions = await this.questionsRepository.findById(questionId, ['response'])


    if (questionId == question.response.questionId && optionId == question.response.choiceId) {
      const user = await this.usersRepository.findById(userId)
      // salvar registro das resposta do usuario
      console.log(new UserResponses({ choiceId: optionId, questionId, userId, }))
      await this.userResponsesRepository.create(new UserResponses({ choiceId: optionId, questionId, userId, }))

      await this.usersRepository.update(user.id, { ...user, score: user.score + pontos })
      console.log(pontos)
      return {
        message: 'respota correta',
        pontuacao: pontos
      }
    }
    else {
      await this.userResponsesRepository.create(new UserResponses({ choiceId: optionId, questionId, userId }))
      return { message: 'respota incorreta' }
    }
  };

  async createUser(data: Users) {
    //regra de negócio
    const user = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };

    console.log(new Users(user))

    const response = await this.usersRepository.create(new Users(user))
    return {
      ...response,
      password: undefined,
    };
  };

  async updateUser(id: string, data: Users) {
    //regra de negócio
    return await this.usersRepository.update(id, data)
  };

  async findAllUser(query): Promise<Users[]> {
    //regra de negócio
    return this.usersRepository.findAll(query)
  }

  async findByEmail(email): Promise<Users> {
    //regra de negócio
    return this.usersRepository.findByEmail(email)
  }


  async deleteUser(id: string): Promise<void> {
    //regra de negócio
    return await this.usersRepository.delete(id)
  }
}
