import { ModulesUseCase } from '../../../application/modules/modules.use-case';

export class UpdateModuleController {
  constructor(
    private readonly service: ModulesUseCase,
    private readonly id: string,
    private readonly body: any,
  ) {}
  async handle(): Promise<any> {
    const response = await this.service.updateModule(this.id, this.body);
    return response;
  }
}
