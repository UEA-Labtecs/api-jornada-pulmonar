import { QuestionsUseCase } from "../../application/questions/question.use-case";


export class FindAllQuestionController {
  constructor(
    private readonly service: QuestionsUseCase,
    private readonly query: any

  ) { }
  async handle() {
    const response = await this.service.findAllQuestion(this.query);
    return response.map((item) => (item))
  }
}
