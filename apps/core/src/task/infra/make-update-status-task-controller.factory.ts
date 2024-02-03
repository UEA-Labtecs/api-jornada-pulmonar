import { TaskRepository } from '../application/task-repository';
import { TaskService } from '../application/task.use-case';
import { UpdateStatusTaskController } from '../presentation/handle/update-status-task.handle';

export const makeUpdateStatusTaskController = (id: string, status: string) => {
  const repository = new TaskRepository();
  const useCase = new TaskService(repository);
  return new UpdateStatusTaskController(useCase, id, status);
};
