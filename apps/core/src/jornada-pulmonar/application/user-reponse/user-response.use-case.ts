import { Injectable } from '@nestjs/common';
import { IUserResponsesUseCase } from '../../domain/user-responses/user-reponses.use-case.contract';
import { UserResponsesRepository } from './user-response-repository';
import { UserResponses } from '../../domain/user-responses/user-responses.entity';

@Injectable()
export class UserResponsesUseCase implements IUserResponsesUseCase {
  constructor(private readonly responsesRepository: UserResponsesRepository) {}

  async createResponse(data: any) {
    //regra de negócio
    return await this.responsesRepository.create(new UserResponses(data));
  }

  async updateResponse(id: string, data: UserResponses) {
    //regra de negócio
    return await this.responsesRepository.update(id, data);
  }

  async findAllResponse(query): Promise<UserResponses[]> {
    //regra de negócio
    return this.responsesRepository.findAll(query);
  }

  async deleteResponse(id: string): Promise<void> {
    //regra de negócio
    return await this.responsesRepository.delete(id);
  }
}
