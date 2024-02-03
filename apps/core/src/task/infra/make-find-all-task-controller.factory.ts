import { BaseRepository } from '@lib/database';
import { Controller } from '../../common/http/controller';
import { TaskRepository } from '../application/task-repository';
import { TaskService } from '../application/task.use-case';
import { FindAllTaskController } from '../presentation/handle/find-all-task.handle';
import { Task } from '../domain/task.entity';

export const makeFindAllTaskController = (query: Task) => {
  const repository = new TaskRepository();
  const service = new TaskService(repository);
  return new FindAllTaskController(service, query);
};
