import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateQuestionController } from '../infra/questions/make-create-task-controller.factory';
import { UpdateQuestionDto } from './dto/update-task.dto';
import { makeUpdateQuestionController } from '../infra/questions/make-update-task-controller.factory';
import { makeFindAllQuestionController } from '../infra/questions/make-find-all-task-controller.factory';
import { makeDeleteQuestionController } from '../infra/questions/make-delete-task-controller.factory';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { makeCreateQuestionOnModuleController } from '../infra/questions/make-create-question-on-module-controller.factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDTO } from './dto/upload.dto';
import { makeFindByIdQuestionController } from '../infra/questions/make-find-by-id-task-controller.factory';


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
  update(@Param('id') id: string, @Body() body: UpdateQuestionDto) {
    const update = makeUpdateQuestionController(id, body);
    return update.handle();
  }

  @IsPublic()
  @Get()
  async findAll(@Query() query: any) {
    const findAll = makeFindAllQuestionController(query)
    return findAll.handle()
  }

  @IsPublic()
  @Get(':id')
  findById(@Param('id') id: string) {
    const findAll = makeFindByIdQuestionController(id)
    return findAll.handle()
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleted = makeDeleteQuestionController(id)
    return deleted.handle();
  }

}
