import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateModuleController } from '../infra/make-create-modules-controller.factory';
import { makeCreateOptionsController } from '../infra/options/make-create-options-controller.factory';


@ApiTags('Options')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('options')
export class OptionsController {

  @Post()
  create(@Body() body: any) {
    const create = makeCreateOptionsController(body);
    return create.handle();
  }

}
