import { Todo } from '@/domain/entities'

export class TodoViewModel {
  id: string
  title: string
  description: string
  date: Date
  favorite: boolean
  status: boolean
  deleted: Date


  static map(entity: Todo): TodoViewModel {

    return {
      ...entity,
    }
  }
}
