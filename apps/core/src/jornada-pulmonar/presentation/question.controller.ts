import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query, Delete } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateQuestionController } from '../infra/questions/make-create-task-controller.factory';
import { UpdateQuestionDto } from './dto/update-task.dto';
import { makeUpdateQuestionController } from '../infra/questions/make-update-task-controller.factory';
import { makeFindAllQuestionController } from '../infra/questions/make-find-all-task-controller.factory';
import { makeDeleteQuestionController } from '../infra/questions/make-delete-task-controller.factory';


@ApiTags('Questions')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('questions')
export class QuestionController {

  @Post()
  create(@Body() body: any) {
    const create = makeCreateQuestionController(body);
    return create.handle();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateQuestionDto) {
    const update = makeUpdateQuestionController(id, body);
    return update.handle();
  }

  @Get()
  async findAll(@Query() query) {
    const findAll = makeFindAllQuestionController(query)
    return findAll.handle()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return;
  }



  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleted = makeDeleteQuestionController(id)
    return deleted.handle();
  }

}
