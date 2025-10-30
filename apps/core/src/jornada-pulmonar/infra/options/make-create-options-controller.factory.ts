import { OptionsRepository } from '../../application/options/options-repository';
import { OptionsUseCase } from '../../application/options/options.use-case';
import { CreateOptionController } from '../../presentation/handle/options/create-options.handle';

export const makeCreateOptionsController = (body: any) => {
  const repository = new OptionsRepository();
  const service = new OptionsUseCase(repository);
  return new CreateOptionController(service, body);
};
