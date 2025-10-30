import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { makeCreateModuleController } from '../infra/modules/make-create-modules-controller.factory';
import { makeDeleteModulesController } from '../infra/modules/make-delete-modules-controller.factory';
import { makeGetAllModuleController } from '../infra/modules/make-get-all-modules-controller.factory';
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

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleted = makeDeleteModulesController(id);
    return deleted.handle();
  }
}
