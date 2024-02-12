
import { ResponsesRepository } from "../../application/response/response-repository";
import { ResponsesUseCase } from "../../application/response/response.use-case";
import { CreateResponseController } from "../../presentation/handle/responses/create-responses.handle";


export const makeCreateResponsesController = (body: any) => {
  const repository = new ResponsesRepository();
  const service = new ResponsesUseCase(repository);
  return new CreateResponseController(service, body);
};
