import { ModulesUseCase } from "../../../application/modules/modules.use-case";


export class CreateModuleController {
  constructor(
    private readonly service: ModulesUseCase,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.service.createModule(this.body);
    return response
  }
}
