import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IStatusTask, Task } from '../domain/task.entity';
import { TaskRepository } from './task-repository';
import { TaskUseCase } from '../domain/task.use-case.contract';
import { TasksPresenter } from '../presentation/presenter/task.presenter';

@Injectable()
export class TaskService implements TaskUseCase {

  constructor(
    private readonly taskRepository: TaskRepository,
  ) { }

  async updateStatus(id: string, status: string): Promise<Task> {
    const isValidStatus = Object.values(IStatusTask).includes(status.toUpperCase() as IStatusTask);
    if (isValidStatus) {
      // Chame o repositório apenas se o status for válido
      return await this.taskRepository.updateStatus(id, status);
    } else {
      throw new HttpException(`status passado não esta corretamente: ${status}`, HttpStatus.CONFLICT)
    }
  }

  async favorite(id: string) {
    //regra de negócio
    return await this.taskRepository.favorite(id)
  };

  async create(data: Task) {
    //regra de negócio

    return await this.taskRepository.create(new Task(data))
  };

  async update(id: string, data: Task) {
    //regra de negócio
    return await this.taskRepository.update(id, data)
  };

  async findAll(query): Promise<Task[]> {
    //regra de negócio
    return this.taskRepository.findAll(query)
  }

  async findOne(id: string) {
    //regra de negócio
    return await this.taskRepository.findById(id)
  }

  async softDelete(id: string): Promise<void> {
    //regra de negócio
    return await this.taskRepository.softDelete(id)
  }
}
