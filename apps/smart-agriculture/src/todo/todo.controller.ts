import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';

@ApiTags('Todo')
@Controller('/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({
    summary: 'Your summary',
    description: 'Your description',
  })
  @Post()
  addTodo(@Body() todo: Todo): Todo {
    return this.todoService.addTodo(todo);
  }

  @Get()
  getTodoList(@Query() query): Todo[] {
    return Object.keys(query).length > 0
      ? this.todoService.filterTodoList(query)
      : this.todoService.getTodoList();
  }

  @Get(':_id')
  getTodo(@Param('_id') _id: string): Todo {
    return this.todoService.getTodo(_id);
  }

  @Put(':_id')
  replaceTodo(@Param('_id') _id: string, @Body() todo: Todo): Todo {
    return this.todoService.replaceTodo(_id, todo);
  }

  @Patch(':_id')
  updateTodo(@Param('_id') _id: string, @Body() todo: Todo): Todo {
    return this.todoService.updateTodo(_id, todo);
  }

  @Delete(':_id')
  deleteTodo(@Param('_id') _id: string): boolean {
    return this.todoService.deleteTodo(_id);
  }
}
