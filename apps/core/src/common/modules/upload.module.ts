import { Module } from '@nestjs/common';
import { UploadController } from '../../jornada-pulmonar/presentation/upload.controller';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [
    // Ajustar
    // UploadsRepository
  ],
})
export class UploadModule {}
