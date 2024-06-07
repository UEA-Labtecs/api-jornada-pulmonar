import { ModulesRepository } from '../../application/modules/modules-repository';
import { ModulesUseCase } from '../../application/modules/modules.use-case';
import { DeleteModuleController } from '../../presentation/handle/modules/delete-modules.handle';

export const makeDeleteModulesController = (id: string) => {
  const repository = new ModulesRepository();
  const useCase = new ModulesUseCase(repository);
  return new DeleteModuleController(useCase, id);
};
