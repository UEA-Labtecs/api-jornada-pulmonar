import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateModuleController } from '../infra/modules/make-create-modules-controller.factory';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { makeGetAllModuleController } from '../infra/modules/make-create-modules-controller.factory copy';
import { makeUpdateModuleController } from '../infra/modules/make-update-module-controller.factory';


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
    const create = makeGetAllModuleController(query);
    return create.handle();
  }


  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const create = makeUpdateModuleController(id, body);
    return create.handle();
  }

}
