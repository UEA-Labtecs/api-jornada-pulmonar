import { Injectable } from '@nestjs/common';
import { Questions } from '../../domain/questions/question.entity';
import { QuestionRepository } from './question-repository';
import { IQuestionsUseCase } from '../../domain/questions/question.use-case.contract';

@Injectable()
export class QuestionsUseCase implements IQuestionsUseCase {

  constructor(
    private readonly QuestionRepository: QuestionRepository,
  ) { }

  async createQuestion(data: Questions) {
    //regra de negócio
    return await this.QuestionRepository.create(new Questions(data))
  };

  async updateQuestion(id: string, data: Questions) {
    //regra de negócio
    return await this.QuestionRepository.update(id, data)
  };

  async findAllQuestion(query): Promise<Questions[]> {
    //regra de negócio
    return this.QuestionRepository.findAll(query)
  }

  async deleteQuestion(id: string): Promise<void> {
    //regra de negócio
    return await this.QuestionRepository.delete(id)
  }
}
