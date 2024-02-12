import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateModuleController } from '../infra/modules/make-create-modules-controller.factory';


@ApiTags('Modules')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('modules')
export class ModulesController {

  @Post()
  create(@Body() body: any) {
    const create = makeCreateModuleController(body);
    return create.handle();
  }

}
