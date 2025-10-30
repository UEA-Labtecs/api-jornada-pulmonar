import { OptionsRepository } from '../../application/options/options-repository';
import { OptionsUseCase } from '../../application/options/options.use-case';
import { UpdateOptionController } from '../../presentation/handle/options/update-options.handle';

export const makeUpdateOptionsController = (id: string, body: any) => {
  const repository = new OptionsRepository();
  const useCase = new OptionsUseCase(repository);
  return new UpdateOptionController(useCase, id, body);
};
