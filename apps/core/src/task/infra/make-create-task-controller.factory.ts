import { BaseRepository } from '@lib/database';
import { Controller } from '../../common/http/controller';
import { TaskRepository } from '../application/task-repository';
import { TaskService } from '../application/task.use-case';
import { CreateTaskController } from '../presentation/handle/create-task.handle';
import { Task } from '../domain/task.entity';
import { CreateTaskDto } from '../presentation/dto/create-task.dto';

export const makeCreateTaskController = (body: CreateTaskDto) => {
  const repository = new TaskRepository();
  const service = new TaskService(repository);
  return new CreateTaskController(service, body);
};
