import { Module } from '@nestjs/common';
import { TaskController } from '../../task/presentation/task.controller';
import { TaskRepository } from '../../task/application/task-repository';

@Module({
  imports: [TaskRepository],
  controllers: [TaskController],
  providers: [
    TaskRepository
  ],
})
export class TaskModule { }
