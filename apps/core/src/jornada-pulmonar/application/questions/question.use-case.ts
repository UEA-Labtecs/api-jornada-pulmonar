import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
import { v4 as uuid } from 'uuid'

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
    const payload = JSON.parse(data.payload);



    // Procura por módulos com o título especificado
    const modules = await this.ModuleRepository.findAll({ title: payload.titleUnit });

    let moduleId;

    if (modules.length > 0) {
      // Se módulos existirem, usa o ID do primeiro módulo encontrado
      moduleId = modules[0].id;
    } else {
      // Se nenhum módulo for encontrado, cria um novo módulo
      const newModule = await this.ModuleRepository.create(new Modules({ title: payload.titleUnit, userId: payload.userId }));
      moduleId = newModule.id;
    }

    const imgNameUrl = file.originalname + uuid();

    const question = await this.QuestionRepository.create(new Questions({
      title: payload.question,
      moduleId: moduleId,
      audioUrl: payload.audioUrl,
      imgNameUrl: imgNameUrl,
      weight: payload.weight
    }));
    await this.uploadUseCase.upload({ ...file, originalname: imgNameUrl });
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


    return { file: { name: imgNameUrl }, moduleId, payload };
  }


  async updateQuestion(id: string, data: Questions) {
    //regra de negócio
    return await this.QuestionRepository.update(id, data)
  };

  async findAllQuestion(query: any): Promise<Questions[]> {
    //regra de negócio
    const questions = await this.QuestionRepository.findAll(query);

    await Promise.all(questions.map(async (question) => {

      if (question.imgNameUrl) {
        const fileUrl = await this.uploadUseCase.getFileURL(question.imgNameUrl)
        question.imgNameUrl = fileUrl.fileUrl;
      }
    }));

    return questions;
  }

  async findByIdQuestion(id: string): Promise<Questions> {
    //regra de negócio

    const a = await this.QuestionRepository.findById(id, ['alternatives']);

    if (!a) {
      throw new HttpException('Questão não encontrada', HttpStatus.BAD_REQUEST)
    }
    return a
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
