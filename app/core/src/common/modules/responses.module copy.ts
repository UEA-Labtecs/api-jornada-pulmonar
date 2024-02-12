import { Module } from '@nestjs/common';
import { ResponsesRepository } from '../../jornada-pulmonar/application/response/response-repository';
import { ResponsesController } from '../../jornada-pulmonar/presentation/responses.controller';


@Module({
  imports: [ResponsesRepository],
  controllers: [ResponsesController],
  providers: [
    ResponsesRepository
  ],
})
export class ResponsesModule { }
