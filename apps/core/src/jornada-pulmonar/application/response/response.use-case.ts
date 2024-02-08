import { Injectable } from '@nestjs/common';
import { ResponsesRepository } from './response-repository';
import { IResponsesUseCase } from '../../domain/responses/reponses.use-case.contract';
import { Responses } from '../../domain/responses/responses.entity';

@Injectable()
export class ResponsesUseCase implements IResponsesUseCase {

  constructor(
    private readonly responsesRepository: ResponsesRepository,
  ) { }

  async createResponse(data: Responses) {
    //regra de negócio
    return await this.responsesRepository.create(new Responses(data))
  };

  async updateResponse(id: string, data: Responses) {
    //regra de negócio
    return await this.responsesRepository.update(id, data)
  };

  async findAllResponse(query): Promise<Responses[]> {
    //regra de negócio
    return this.responsesRepository.findAll(query)
  }

  async deleteResponse(id: string): Promise<void> {
    //regra de negócio
    return await this.responsesRepository.delete(id)
  }
}
