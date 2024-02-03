import { TaskService } from '../../application/task.use-case';
import { TasksPresenter } from '../presenter/task.presenter';

export class FavoriteTaskController {
  constructor(
    private readonly service: TaskService,
    private readonly id: string
  ) { }
  async handle(): Promise<any> {
    const response = await this.service.favorite(this.id);
    return new TasksPresenter(response)
  }
}
