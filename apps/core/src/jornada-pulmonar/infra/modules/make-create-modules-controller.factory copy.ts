import { ModulesRepository } from "../../application/modules/modules-repository";
import { ModulesUseCase } from "../../application/modules/modules.use-case";
import { CreateModuleController } from "../../presentation/handle/modules/create-modules.handle";
import { GetAllModuleController } from "../../presentation/handle/modules/get-all-modules.handle";


export const makeGetAllModuleController = (query: string) => {
  const repository = new ModulesRepository();
  const service = new ModulesUseCase(repository);
  return new GetAllModuleController(service, query);
};
