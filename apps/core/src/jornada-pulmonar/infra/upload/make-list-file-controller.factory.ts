import { UploadsUseCase } from "../../application/upload/upload.use-case";
import { ListFileFileController } from "../../presentation/handle/upload/list-file.handle";



export const makeListFileController = (fileName: string) => {
  const service = new UploadsUseCase();
  return new ListFileFileController(service, fileName);
};
