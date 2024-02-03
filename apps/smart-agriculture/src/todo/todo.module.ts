import { DatabaseModule } from 'libs/database 0/src';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TodoController, DatabaseModule],
  providers: [TodoService],
})
export class TodoModule {}
