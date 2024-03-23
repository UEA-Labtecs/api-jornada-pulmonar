import { Injectable } from '@nestjs/common';
import { Questions } from '../../domain/questions/question.entity';
import { QuestionRepository } from './question-repository';
import { IQuestionsUseCase } from '../../domain/questions/question.use-case.contract';
import { ModulesRepository } from '../modules/modules-repository';
import { Modules } from '../../domain/modules/modules.entity';
import { OptionsRepository } from '../options/options-repository';
import { Options } from '../../domain/options/options.entity';
import { ResponsesRepository } from '../response/response-repository';
import { Responses } from '../../domain/responses/responses.entity';

@Injectable()
export class QuestionsUseCase implements IQuestionsUseCase {

  constructor(
    private readonly QuestionRepository: QuestionRepository,
    private readonly ModuleRepository?: ModulesRepository,
    private readonly OptionRepository?: OptionsRepository,
    private readonly ResponseRepository?: ResponsesRepository,
  ) { }

  async createQuestion(data: Questions) {
    //regra de negócio
    return await this.QuestionRepository.create(new Questions(data))
  };

  async createQuestinModule(data: any) {
    const alternatives = [];

    const module = await this.ModuleRepository.create(new Modules({ title: data.titleUnit, userId: data.userId }));

    const question = await this.QuestionRepository.create(new Questions({
      title: data.question,
      moduleId: module.id
    }));

    await Promise.all(data.alternatives.map(async (alternative) => {
      const ops = await this.OptionRepository.create(new Options({
        content: alternative.description,
        questionId: question.id
      }));

      if (alternative.correctAlternative === true) {
        await this.ResponseRepository.create(new Responses({ choiceId: ops.id, questionId: question.id }));
      }

      alternatives.push(ops);
    }));


    return { module, question, alternatives };
  }


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
