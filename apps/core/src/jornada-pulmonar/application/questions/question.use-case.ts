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
import { UploadsUseCase } from '../upload/upload.use-case';

@Injectable()
export class QuestionsUseCase implements IQuestionsUseCase {

  constructor(
    private readonly QuestionRepository: QuestionRepository,
    private readonly ModuleRepository?: ModulesRepository,
    private readonly OptionRepository?: OptionsRepository,
    private readonly ResponseRepository?: ResponsesRepository,
    private readonly uploadUseCase?: UploadsUseCase,
  ) { }



  async createQuestinModule(file: any, data: any) {
    const alternatives = [];
    const payload = JSON.parse(data.payload)

    await this.uploadUseCase.upload(file)
    const module = await this.ModuleRepository.create(new Modules({ title: payload.titleUnit, userId: payload.userId }));
    const imgNameUrl = file.originalname + '$' + payload.question
    const question = await this.QuestionRepository.create(new Questions({
      title: payload.question,
      moduleId: module.id,
      audioUrl: payload.audioUrl,
      imgNameUrl: imgNameUrl,
      weight: payload.weight
    }));

    await Promise.all(payload.alternatives.map(async (alternative) => {
      const ops = await this.OptionRepository.create(new Options({
        content: alternative.description,
        questionId: question.id
      }));

      if (alternative.correctAlternative === true) {
        await this.ResponseRepository.create(new Responses({ choiceId: ops.id, questionId: question.id }));
      }

      alternatives.push(ops);
    }));


    return { file: { name: file.originalname }, payload };
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

  async createQuestion(data: Questions) {
    //regra de negócio
    return await this.QuestionRepository.create(new Questions(data))
  };
}
