import { OptionsUseCase } from "../../../application/options/options.use-case";


export class CreateOptionController {
  constructor(
    private readonly service: OptionsUseCase,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.service.createOption(this.body);
    return response
  }
}
