// task.controller.ts
import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateTaskController } from '../infra/make-create-task-controller.factory';
import { UpdateTaskDto } from './dto/update-task.dto';
import { makeUpdateTaskController } from '../infra/make-update-task-controller.factory';
import { makeFindAllTaskController } from '../infra/make-find-all-task-controller.factory';
import { makeDeleteTaskController } from '../infra/make-delete-task-controller.factory';
import { makeUpdateStatusTaskController } from '../infra/make-update-status-task-controller.factory';
import { makeFavoriteTaskController } from '../infra/make-favorite-task-controller.factory';
import { TasksPresenter } from './presenter/task.presenter';


@ApiTags('Tasks')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('tasks')
export class TaskController {

  @Post()
  create(@Body() body: CreateTaskDto) {
    const create = makeCreateTaskController(body);
    return create.handle();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    const update = makeUpdateTaskController(id, body);
    return update.handle();
  }

  @Get()
  async findAll(@Query() query) {
    const findAll = makeFindAllTaskController(query)
    return findAll.handle()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return;
  }

  @Patch('favorite/:id')
  findFavorite(@Param('id') id: string) {
    const favorite = makeFavoriteTaskController(id)
    return favorite.handle()
  }

  @Patch('soft-delete/:id')
  softDelete(@Param('id') id: string) {
    const deleted = makeDeleteTaskController(id)
    return deleted.handle();
  }

  @Patch(':id/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: string) {
    console.log('===>>>>', status)

    const updateStatus = makeUpdateStatusTaskController(id, status);
    return updateStatus.handle();
  }
}
