import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateResponsesController } from '../infra/responses/make-create-responses-controller.factory';


@ApiTags('Responses')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('responses')
export class ResponsesController {

  @Post()
  create(@Body() body: any) {
    const create = makeCreateResponsesController(body);
    return create.handle();
  }


}

