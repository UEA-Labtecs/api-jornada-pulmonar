import { Todo } from '@/domain/entities';
import { CrudTodo } from '@/domain/usecases';
import { ListTodosError, TodoAlreadExistTodosError } from '@/domain/errors';
import { CrudTodoRepository } from '@/data/contracts';
import { TodoViewModel } from '@/presentation/view-models';
import { TodoNotExistTodosError } from '@/domain/errors/todo-not-exist';

export class CrudTodoService implements CrudTodo {
  constructor(private readonly crudTodoRepository: CrudTodoRepository) { }

  async create(data: CreateTodoController.Request): Promise<Todo> {
    const todos = await this.crudTodoRepository.listTodos();
    const titleExists = todos.some((todo) => todo.title === data.title);

    if (titleExists) {
      throw new TodoAlreadExistTodosError();
    }

    const createdTodo = await this.crudTodoRepository.createTodo(data);

    return createdTodo;
  }

  async list(): Promise<Todo[]> {
    const a = 1;
    if (a > 2) {
      throw new ListTodosError();
    }

    return this.crudTodoRepository.listTodos();
  }

  async listByDescription(description): Promise<Todo[]> {
    const a = 1;
    if (a > 2) {
      throw new ListTodosError();
    }

    return this.crudTodoRepository.listTodoByDescription(description);
  }

  async favorite(id): Promise<Todo> {
    const a = 1;
    if (a > 2) {
      throw new ListTodosError();
    }

    return this.crudTodoRepository.favorite(id);
  }

  async update(id: string, data: Todo): Promise<Todo> {

    const todos = await this.crudTodoRepository.listTodos();
    const idExists = todos.some((todo) => todo.id === id);
    if (idExists) {
      throw new TodoNotExistTodosError();
    }

    const updatedTodo = await this.crudTodoRepository.updateTodo(id, data);
    return updatedTodo;
  }

  async delete(id: string): Promise<void> {
    const todos = await this.crudTodoRepository.listTodos();
    const idExists = todos.some((todo) => todo.id === id);
    if (idExists) {
      throw new TodoNotExistTodosError();
    }
    await this.crudTodoRepository.deleteTodo(id);
  }
}

export namespace CreateTodoController {
  export type Request = TodoViewModel;
}
