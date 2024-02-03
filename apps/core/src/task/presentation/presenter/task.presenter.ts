import { Task } from "../../domain/task.entity"

export class TasksPresenter {
  id: string
  title: string
  description: string
  favorite: boolean
  status: string


  constructor(task: Task) {
    this.id = task.id
    this.title = task.title
    this.description = task.description
    this.favorite = task.favorite
    this.status = task.status
  }
}
