import { TaskRepository } from '../application/task-repository';
import { TaskService } from '../application/task.use-case';
import { FavoriteTaskController } from '../presentation/handle/favorite-task.handle';

export const makeFavoriteTaskController = (id: string) => {
  const repository = new TaskRepository();
  const useCase = new TaskService(repository);
  return new FavoriteTaskController(useCase, id);
};