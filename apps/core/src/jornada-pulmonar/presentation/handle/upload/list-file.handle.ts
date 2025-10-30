import { UploadsUseCase } from '../../../application/upload/upload.use-case';

export class ListFileFileController {
  constructor(
    private readonly service: UploadsUseCase,
    private readonly fileName: string,
  ) {}
  async handle() {
    const response = await this.service.getFileURL(this.fileName);
    return response;
  }
}
