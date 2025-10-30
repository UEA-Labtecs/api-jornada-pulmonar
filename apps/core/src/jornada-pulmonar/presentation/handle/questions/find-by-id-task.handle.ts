import { QuestionsUseCase } from '../../../application/questions/question.use-case';

export class FindByIdQuestionController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly id: string,
  ) {}
  async handle() {
    const response = await this.service.findByIdQuestion(this.id);
    return response;
  }
}
