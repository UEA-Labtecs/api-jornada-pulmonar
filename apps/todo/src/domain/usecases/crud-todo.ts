import { Todo } from '@/domain/entities'

export interface CrudTodo {
  create: (param: Todo) => Promise<Todo>
  list: () => Promise<Todo[]>
  favorite: (id: string) => Promise<Todo>
  listByDescription: (description: string) => Promise<Todo[]>
  update: (id: string, data: Todo) => Promise<Todo>
  delete: (id: string) => Promise<void>
}