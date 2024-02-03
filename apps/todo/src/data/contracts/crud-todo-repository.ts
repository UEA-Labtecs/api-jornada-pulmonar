import { TodoModel } from '@/data/models'

export interface CrudTodoRepository {
  createTodo: (data: TodoModel) => Promise<TodoModel>
  listTodos: () => Promise<TodoModel[]>
  listTodoByDescription: (description: string) => Promise<TodoModel[]>
  favorite: (id: string) => Promise<TodoModel>
  updateTodo: (id: string, data: TodoModel) => Promise<TodoModel>
  deleteTodo: (id: string) => Promise<void>
}
