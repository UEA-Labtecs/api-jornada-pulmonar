
import { QuestionsUseCase } from '../../application/questions/question.use-case';

export class DeleteQuestionController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly id: string,
  ) { }
  async handle() {
    return await this.service.deleteQuestion(this.id);
  }
}
