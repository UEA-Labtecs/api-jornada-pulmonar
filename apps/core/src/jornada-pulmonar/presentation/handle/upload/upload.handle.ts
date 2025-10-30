import { UploadsUseCase } from '../../../application/upload/upload.use-case';

export class UploadFileController {
  constructor(
    private readonly service: UploadsUseCase,
    private readonly file: any,
  ) {}
  async handle() {
    const response = await this.service.upload(this.file);
    return response;
  }
}
