import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/upload.dto';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { makeUploadController } from '../infra/upload/make-upload-controller.factory';
import { makeListFileController } from '../infra/upload/make-list-file-controller.factory';

@Controller('upload')
export class UploadController {

  @IsPublic()
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: FileDTO) {
    const upload = makeUploadController(file);
    return upload.handle();
  }

  @IsPublic()
  @Get('/:fileName')
  async listFile(@Param('fileName') fileName: string) {
    const upload = makeListFileController(fileName);
    return upload.handle();
  }
}