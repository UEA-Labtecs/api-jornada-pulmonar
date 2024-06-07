
import { QuestionsUseCase } from '../../../application/questions/question.use-case';

export class DeleteQuestionController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly id: string,
  ) { }
  async handle() {
    console.log(this.id)

    return await this.service.deleteQuestion(this.id);
  }
}
