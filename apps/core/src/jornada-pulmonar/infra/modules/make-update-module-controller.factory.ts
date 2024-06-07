
import { ModulesRepository } from '../../application/modules/modules-repository';
import { ModulesUseCase } from '../../application/modules/modules.use-case';
import { UpdateModuleController } from '../../presentation/handle/modules/update-module.handle';

export const makeUpdateModuleController = (id: string, body: any) => {
  const repository = new ModulesRepository();
  const service = new ModulesUseCase(repository);
  return new UpdateModuleController(service, id, body);
};
