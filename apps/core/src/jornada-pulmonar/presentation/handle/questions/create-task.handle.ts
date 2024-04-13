
import { QuestionsUseCase } from '../../../application/questions/question.use-case';

export class CreateQuestionController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.service.createQuestion(this.body);
    return response
  }
}
