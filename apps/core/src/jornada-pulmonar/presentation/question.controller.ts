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
import { makeCreateQuestionOnModuleController } from '../infra/questions/make-create-question-on-module-controller.factory';
import { makeCreateQuestionController } from '../infra/questions/make-create-task-controller.factory';
import { makeDeleteQuestionController } from '../infra/questions/make-delete-task-controller.factory';
import { makeFindAllQuestionController } from '../infra/questions/make-find-all-task-controller.factory';
import { makeFindByIdQuestionController } from '../infra/questions/make-find-by-id-task-controller.factory';
import { makeUpdateQuestionController } from '../infra/questions/make-update-task-controller.factory';

@ApiTags('Questions')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('questions')
export class QuestionController {
  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    const create = makeCreateQuestionController(body);
    return create.handle();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Post('on-module')
  createOnModule(@Body() payload: any) {
    const create = makeCreateQuestionOnModuleController(payload);
    return create.handle();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const update = makeUpdateQuestionController(id, body);
    return update.handle();
  }

  @IsPublic()
  @Get()
  async findAll(@Query() query: any) {
    const findAll = makeFindAllQuestionController(query);
    return findAll.handle();
  }

  @IsPublic()
  @Get(':id')
  findById(@Param('id') id: string) {
    const findAll = makeFindByIdQuestionController(id);
    return findAll.handle();
  }

  @IsPublic()
  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleted = makeDeleteQuestionController(id);
    return deleted.handle();
  }
}
