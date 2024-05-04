import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async ranking(query: any): Promise<Users[]> {
    const users = await this.usersRepository.findAll(query, [], {
      score: 'desc',
    });
    return users
  }

  async verifyResponse(optionId: string, questionId: string, userId: string, time: number): Promise<any> {
    const question: Questions = await this.questionsRepository.findById(questionId, ['response'])
    const responsesUser = await this.usersRepository.findById(userId, ['userResponses'])

    const pontos = calcularPontuacao(time)

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

  async createUser(data: any): Promise<any> {
    //regra de negócio

    const email = await this.findByEmail(data.email)
    if (email) {
      throw new HttpException('Email já cadastrado no sistema', HttpStatus.BAD_REQUEST)
    }
    const user = {
      ...data,
      email: data.email.toLowerCase(),
      password: await bcrypt.hash(data.password, 10),
    };

    const response = await this.usersRepository.create(new Users(user))

    return {
      ...response,
      password: undefined,
    };
  };

  // async addImgUser(id: string, file: FileDTO): Promise<any> {
  //   //regra de negócio
  //   const users = await this.usersRepository.findAll({ id });
  //   if (!users[0]) {
  //     throw new HttpException('Usuário não encontrado', HttpStatus.BAD_REQUEST)
  //   }
  //   if (file) {
  //     console.log(file)
  //     users[0].imgNameUrl = users[0].imgNameUrl ? users[0].imgNameUrl : file.originalname + uuid()
  //     await this.uploadUseCase.upload({ ...file, originalname: users[0].imgNameUrl })
  //   } else {
  //     throw new HttpException('Imagem não enviada', HttpStatus.BAD_REQUEST)
  //   }
  //   return await this.usersRepository.update(id,
  //     {
  //       email: users[0].email,
  //       imgNameUrl: users[0].imgNameUrl,
  //       role: users[0].role,
  //       score: users[0].score,
  //       username: users[0].username,
  //       password: users[0].password,
  //       id: users[0].id,
  //       createdAt: users[0].createdAt
  //     }
  //   )
  // };

  async updateUser(id: string, data: Users) {
    //regra de negócio
    return await this.usersRepository.update(id, data)
  };

  async findAllUser(query): Promise<Users[]> {
    //regra de negócio
    const users = await this.usersRepository.findAll(query)

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
