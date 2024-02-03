
import { TaskService } from '../../application/task.use-case';

export class DeleteTaskController {
  constructor(
    private readonly service: TaskService,
    private readonly id: string,
  ) { }
  async handle() {
    return await this.service.softDelete(this.id);
  }
}
