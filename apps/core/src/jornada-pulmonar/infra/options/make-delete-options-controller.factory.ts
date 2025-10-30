import { OptionsRepository } from '../../application/options/options-repository';
import { OptionsUseCase } from '../../application/options/options.use-case';
import { DeleteOptionController } from '../../presentation/handle/options/delete-options.handle';

export const makeDeleteOptionsController = (id: string) => {
  const repository = new OptionsRepository();
  const useCase = new OptionsUseCase(repository);
  return new DeleteOptionController(useCase, id);
};
