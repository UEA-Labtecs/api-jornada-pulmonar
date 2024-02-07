import { QuestionsUseCase } from '../../application/questions/question.use-case';

export class UpdateQuestionController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly id: string,
    private readonly body: any,
  ) { }
  async handle(): Promise<any> {
    const response = await this.service.updateQuestion(this.id, this.body);
    return response
  }
}
