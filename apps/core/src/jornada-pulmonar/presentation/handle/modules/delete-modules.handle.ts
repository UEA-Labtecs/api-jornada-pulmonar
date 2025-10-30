import { ModulesUseCase } from '../../../application/modules/modules.use-case';

export class DeleteModuleController {
  constructor(
    private readonly service: ModulesUseCase,
    private readonly id: string,
  ) {}
  async handle() {
    console.log(this.id);

    return await this.service.deleteModule(this.id);
  }
}
