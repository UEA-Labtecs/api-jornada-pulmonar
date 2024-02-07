import { ModulesRepository } from "../application/modules/modules-repository";
import { ModulesUseCase } from "../application/modules/modules.use-case";
import { CreateModuleController } from "../presentation/handle/create-modules.handle";


export const makeCreateModuleController = (body: any) => {
  const repository = new ModulesRepository();
  const service = new ModulesUseCase(repository);
  return new CreateModuleController(service, body);
};
