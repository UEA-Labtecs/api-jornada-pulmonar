
import { QuestionsUseCase } from '../../../application/questions/question.use-case';

export class CreateQuestionOnModuleController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.service.createQuestinModule(this.body);
    return response
  }
}
