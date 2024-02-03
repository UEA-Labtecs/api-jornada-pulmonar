
import { TaskService } from '../../application/task.use-case';
import { TasksPresenter } from '../presenter/task.presenter';

export class CreateTaskController {
  constructor(
    private readonly service: TaskService,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.service.create(this.body);
    return new TasksPresenter(response)
  }
}
