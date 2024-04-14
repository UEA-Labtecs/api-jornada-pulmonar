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
import { FileDTO } from '../../presentation/dto/upload.dto';
import { UploadsUseCase } from '../upload/upload.use-case';
import { v4 as uuid } from 'uuid'

@Injectable()
export class UsersUseCase implements IUsersUseCase {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly questionsRepository?: QuestionRepository,
    private readonly userResponsesRepository?: UserResponsesRepository,
    private readonly uploadUseCase?: UploadsUseCase,

  ) { }

  async ranking(query): Promise<Users[]> {
    const users = await this.usersRepository.findAll(query, {
      score: 'desc',
    });

    await Promise.all(users.map(async (user) => {
      const fileUrl = await this.uploadUseCase.getFileURL(user.imgNameUrl)
      user.imgNameUrl = fileUrl.fileUrl
    }))

    return users
  }

  async verifyResponse(optionId: string, questionId: string, userId: string, time: number): Promise<any> {
    const question: Questions = await this.questionsRepository.findById(questionId, ['response'])
    const responsesUser = await this.usersRepository.findById(userId, ['userResponses'])

    const pontos = calcularPontuacao(time, question.weight)

    for (const item of responsesUser.userResponses) {
      if (questionId === item.questionId && item.isCorrect == true) {
        return {
          message: 'questão já respondida',
        }
      }
    }

    if (questionId == question.response.questionId && optionId == question.response.choiceId) {
      const user = await this.usersRepository.findById(userId)
      // salvar registro das resposta do usuario
      await this.userResponsesRepository.create(new UserResponses({ choiceId: optionId, questionId, userId, isCorrect: true }))

      await this.usersRepository.update(user.id, { ...user, score: user.score + pontos - (responsesUser.userResponses.length * 2) })

      return {
        message: 'respota correta',
        pontuacao: pontos - (responsesUser.userResponses.length * 2)
      }
    }
    else {
      await this.userResponsesRepository.create(new UserResponses({ choiceId: optionId, questionId, userId, isCorrect: false }))
      return { message: 'respota incorreta' }
    }
  };

  async createUser(file: FileDTO, data: any) {
    //regra de negócio

    const payload = JSON.parse(data.payload);

    const user = {
      ...payload,
      password: await bcrypt.hash(payload.password, 10),
      imgNameUrl: payload.name + uuid()
    };


    const response = await this.usersRepository.create(new Users(user))
    await this.uploadUseCase.upload({ ...file, originalname: user.imgNameUrl });
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
    const users = await this.usersRepository.findAll(query)

    await Promise.all(users.map(async (user) => {
      const fileUrl = await this.uploadUseCase.getFileURL(user.imgNameUrl)
      user.imgNameUrl = fileUrl.fileUrl
    }))

    return users
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
