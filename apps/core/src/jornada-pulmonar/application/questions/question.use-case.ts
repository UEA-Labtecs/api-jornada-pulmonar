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
    console.log({ data })
    return await this.QuestionRepository.update(id, data)
  };

  async findAllQuestion(query: any): Promise<Questions[]> {
    // Obter todas as respostas
    console.log('aqui')
    const responses = await this.userResponseRepository.findAll();
    // Obter todas as perguntas
    const questions = await this.QuestionRepository.findAll(query, ['alternatives']);

    console.log({ questions })
    // Iterar sobre as respostas e modificar as perguntas conforme necessário
    responses.forEach(response => {
      // Verificar se a resposta está correta
      if (response.isCorrect) {
        // Encontrar a pergunta correspondente pelo questionId
        const question = questions.find(q => q.id === response.questionId);
        if (question) {
          // Definir answered como true na pergunta correspondente
          question.answered = true;
          question.imageBase64 = 'true';
        }

      }
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
    return await this.QuestionRepository.delete(id)
  }

  async createQuestion(data: Questions) {
    //regra de negócio
    return await this.QuestionRepository.create(new Questions(data))
  };
}
