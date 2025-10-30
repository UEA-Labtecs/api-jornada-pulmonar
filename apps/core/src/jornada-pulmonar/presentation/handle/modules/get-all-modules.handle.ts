import { ModulesUseCase } from '../../../application/modules/modules.use-case';

export class GetAllModuleController {
  constructor(
    private readonly service: ModulesUseCase,
    private readonly query: string,
  ) {}
  async handle() {
    const response = await this.service.findAllModule(this.query);
    return response;
  }
}
