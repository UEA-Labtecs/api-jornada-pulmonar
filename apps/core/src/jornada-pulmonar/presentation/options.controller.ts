import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { makeCreateOptionsController } from '../infra/options/make-create-options-controller.factory';
import { makeDeleteOptionsController } from '../infra/options/make-delete-options-controller.factory';
import { makeUpdateOptionsController } from '../infra/options/make-update-options-controller.factory';

@ApiTags('Options')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('options')
export class OptionsController {
  @IsPublic()
  // @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    const create = makeCreateOptionsController(body);
    return create.handle();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const update = makeUpdateOptionsController(id, body);
    return update.handle();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleted = makeDeleteOptionsController(id);
    return deleted.handle();
  }
}
