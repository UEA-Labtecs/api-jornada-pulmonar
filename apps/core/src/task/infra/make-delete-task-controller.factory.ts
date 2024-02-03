import { TaskRepository } from '../application/task-repository';
import { TaskService } from '../application/task.use-case';
import { DeleteTaskController } from '../presentation/handle/delete-task.handle';

export const makeDeleteTaskController = (id: string) => {
  const repository = new TaskRepository();
  const useCase = new TaskService(repository);
  return new DeleteTaskController(useCase, id);
};
