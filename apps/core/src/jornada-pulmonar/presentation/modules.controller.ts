import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateModuleController } from '../infra/modules/make-create-modules-controller.factory';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { makeGetAllModuleController } from '../infra/modules/make-create-modules-controller.factory copy';


@ApiTags('Modules')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('modules')
export class ModulesController {

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    const create = makeCreateModuleController(body);
    return create.handle();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get()
  listAll(@Query() query: string) {
    console.log('controller: ', query)
    const create = makeGetAllModuleController(query);
    return create.handle();
  }

}
