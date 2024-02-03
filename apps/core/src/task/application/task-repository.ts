import { BaseRepository } from "@lib/database";
import { ITaskRepository } from "../domain/task-repository.contract";
import { IStatusTask, Task } from "../domain/task.entity";

export class TaskRepository implements ITaskRepository {
  private readonly tableName = 'Tasks';

  private readonly repositoryDatabase: BaseRepository<Task>;

  constructor() {
    this.repositoryDatabase = new BaseRepository<Task>(this.tableName);
  }




}
