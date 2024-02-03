import { Task } from "./task.entity"

export interface TaskUseCase {
  create: (data: Task) => Promise<Task>
  findAll: (query?: any) => Promise<Task[]>
  findOne: (id: string) => Promise<Task>
  update: (id: string, data: Task) => Promise<Task>
  softDelete: (id: string) => Promise<void>
  updateStatus: (id: string, status: string) => Promise<Task | { error: string }>
  favorite: (id: string) => Promise<Task>
}