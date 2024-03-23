import { UploadsUseCase } from "../../application/upload/upload.use-case";
import { UploadFileController } from "../../presentation/handle/upload/upload.handle";



export const makeUploadController = (file: any) => {
  const service = new UploadsUseCase();
  return new UploadFileController(service, file);
};
