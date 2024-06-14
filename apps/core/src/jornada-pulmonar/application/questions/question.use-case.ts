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
import { UserResponsesRepository } from '../user-reponse/user-response-repository';

@Injectable()
export class QuestionsUseCase implements IQuestionsUseCase {

  constructor(
    private readonly QuestionRepository: QuestionRepository,
    private readonly ModuleRepository?: ModulesRepository,
    private readonly OptionRepository?: OptionsRepository,
    private readonly ResponseRepository?: ResponsesRepository,
    private readonly userResponseRepository?: UserResponsesRepository,
  ) { }


  async createQuestinModule(data: any) {
    const alternatives = [];
    const payload = data;



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

    const question = await this.QuestionRepository.create(new Questions({
      title: payload.question,
      moduleId: moduleId,
      audioUrl: payload.audioUrl,
      imageBase64: payload.imageBase64,
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


    return payload;
  }


  async updateQuestion(id: string, data: any) {
    //regra de negócio
    const ids = await this.QuestionRepository.findById(id)

    if (!ids) {
      throw new HttpException("Questao não encontrada", HttpStatus.BAD_REQUEST)
    }

    await this.QuestionRepository.delete(id)
    const alternatives = [];
    const payload = data;



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

    const question = await this.QuestionRepository.create(new Questions({
      title: payload.question,
      moduleId: moduleId,
      audioUrl: payload.audioUrl,
      imageBase64: payload.imageBase64,
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

    return;
  };

  async findAllQuestion(query: any) {
    // Obter todas as respostas do usuário
    const responses = await this.userResponseRepository.findAll({ userId: query.userId });

    // Obter todas as respostas corretas
    const correctResponses = await this.ResponseRepository.findAll({ questionId: query.questionId });
    console.log({ responses });
    console.log({ correctResponses });

    // Obter todas as perguntas com alternativas
    const questions = await this.QuestionRepository.findAll({}, ['alternatives']);
    console.log({ questions });

    // Iterar sobre as perguntas e adicionar a informação da alternativa correta
    questions.forEach(question => {
      // Iterar sobre as alternativas e adicionar o campo isCorrect
      question.alternatives.forEach(alternative => {
        const correctResponse = correctResponses.find(response => response.choiceId === alternative.id);
        alternative.correctAlternative = correctResponse ? true : false;
      });

      // Iterar sobre as respostas do usuário e modificar as perguntas conforme necessário
      responses.forEach(response => {
        if (response.isCorrect && response.questionId === question.id) {
          question.answered = true;
          question.imageBase64 = 'true';
        }
      });
    });

    // Retornar as perguntas modificadas
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
    console.log('+++++++')
    return await this.QuestionRepository.delete(id)
  }

  async createQuestion(data: Questions) {
    //regra de negócio
    return await this.QuestionRepository.create(new Questions(data))
  };
}
