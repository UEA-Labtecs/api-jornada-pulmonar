import { ModulesUseCase } from '../../../application/modules/modules.use-case';
import { OptionsUseCase } from '../../../application/options/options.use-case';
import { QuestionsUseCase } from '../../../application/questions/question.use-case';

export class UpdateOptionController {
  constructor(
    private readonly service: OptionsUseCase,
    private readonly id: string,
    private readonly body: any,
  ) { }
  async handle(): Promise<any> {
    const response = await this.service.updateOption(this.id, this.body);
    return response
  }
}
