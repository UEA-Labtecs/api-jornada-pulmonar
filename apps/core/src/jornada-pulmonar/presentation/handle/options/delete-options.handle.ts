
import { OptionsUseCase } from '../../../application/options/options.use-case';

export class DeleteOptionController {
  constructor(
    private readonly service: OptionsUseCase,
    private readonly id: string,
  ) { }
  async handle() {
    console.log(this.id)

    return await this.service.deleteOption(this.id);
  }
}
