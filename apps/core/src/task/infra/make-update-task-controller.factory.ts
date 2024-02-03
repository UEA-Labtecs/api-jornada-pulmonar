import { TaskRepository } from '../application/task-repository';
import { TaskService } from '../application/task.use-case';
import { UpdateTaskController } from '../presentation/handle/update-task.handle';
import { UpdateTaskDto } from '../presentation/dto/update-task.dto';

export const makeUpdateTaskController = (id: string, body: UpdateTaskDto) => {
  const repository = new TaskRepository();
  const useCase = new TaskService(repository);
  return new UpdateTaskController(useCase, id, body);
};
