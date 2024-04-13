
import { QuestionsUseCase } from '../../../application/questions/question.use-case';

export class CreateQuestionOnModuleController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly file: any,
    private readonly payload: any,
  ) { }
  async handle() {
    const response = await this.service.createQuestinModule(this.file, this.payload);
    return response
  }
}
