import { ResponsesUseCase } from "../../../application/response/response.use-case";


export class CreateResponseController {
  constructor(
    private readonly service: ResponsesUseCase,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.service.createResponse(this.body);
    return response
  }
}
