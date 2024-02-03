import { TaskService } from '../../application/task.use-case';
import { TasksPresenter } from '../presenter/task.presenter';

export class UpdateStatusTaskController {
  constructor(
    private readonly service: TaskService,
    private readonly id: string,
    private readonly status: string,
  ) { }
  async handle() {
    const response = await this.service.updateStatus(this.id, this.status);
    return new TasksPresenter(response)
  }
}
