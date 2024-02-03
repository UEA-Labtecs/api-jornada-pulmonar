import { TaskService } from '../../application/task.use-case';

export class UpdateTaskController {
  constructor(
    private readonly service: TaskService,
    private readonly id: string,
    private readonly body: any,
  ) { }
  async handle(): Promise<any> {
    const response = await this.service.update(this.id, this.body);
    return response
  }
}
