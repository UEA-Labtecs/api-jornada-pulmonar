// mockCrudTodoRepository.ts
import { Todo } from '@/domain/entities';
import { CrudTodoRepository } from '@/data/contracts';

export class MockCrudTodoRepository implements CrudTodoRepository {
  private todos: Todo[];

  constructor(initialTodos: Todo[] = []) {
    this.todos = initialTodos;
  }

  async createTodo(todo: Todo): Promise<Todo> {
    this.todos.push(todo);
    return todo;
  }

  async listTodos(): Promise<Todo[]> {
    return this.todos;
  }

  async listTodoByDescription(description: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.description === description);
  }

  async favorite(id: string): Promise<Todo> {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.favorite = true;
    }
    return todo;
  }

  async updateTodo(id: string, data: Todo): Promise<Todo> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...data };
      return this.todos[index];
    }
    return null;
  }

  async deleteTodo(id: string): Promise<void> {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
