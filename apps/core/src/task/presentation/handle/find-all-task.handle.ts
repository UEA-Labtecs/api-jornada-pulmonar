
import { TaskService } from '../../application/task.use-case';
import { TasksPresenter } from '../presenter/task.presenter';

export class FindAllTaskController {
  constructor(
    private readonly service: TaskService,
    private readonly query: any

  ) { }
  async handle() {
    const response = await this.service.findAll(this.query);
    return response.map((item) => new TasksPresenter(item))
  }
}
