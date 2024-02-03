import { MockCrudTodoRepository } from './mockCrudTodoRepository';
import { Todo } from '@/domain/entities';

describe('MockCrudTodoRepository', () => {
  let mockCrudTodoRepository: MockCrudTodoRepository;

  beforeEach(() => {
    mockCrudTodoRepository = new MockCrudTodoRepository();
  });

  it('deve criar um novo todo com sucesso', async () => {
    const todoData: Todo = {
      id: '1',
      title: 'Novo Todo',
      description: 'Descrição do Todo',
      date: new Date(),
      favorite: false,
      status: false,
      deleted: null,
    };

    const createdTodo = await mockCrudTodoRepository.createTodo(todoData);

    expect(createdTodo).toEqual(todoData);
    expect(mockCrudTodoRepository.listTodos()).resolves.toEqual([todoData]);
  });

  it('deve listar todos com sucesso', async () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'Todo 1',
        description: 'Descrição 1',
        date: new Date(),
        favorite: false,
        status: false,
        deleted: null,
      },
      {
        id: '2',
        title: 'Todo 2',
        description: 'Descrição 2',
        date: new Date(),
        favorite: false,
        status: false,
        deleted: null,
      },
    ];

    mockCrudTodoRepository = new MockCrudTodoRepository(todos);

    const listedTodos = await mockCrudTodoRepository.listTodos();

    expect(listedTodos).toEqual(todos);
  });

  it('deve listar todos por descrição com sucesso', async () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'Todo 1',
        description: 'Descrição 1',
        date: new Date(),
        favorite: false,
        status: false,
        deleted: null,
      },
      {
        id: '2',
        title: 'Todo 2',
        description: 'Descrição 2',
        date: new Date(),
        favorite: false,
        status: false,
        deleted: null,
      },
      {
        id: '3',
        title: 'Todo 3',
        description: 'Descrição 1',
        date: new Date(),
        favorite: false,
        status: false,
        deleted: null,
      },
    ];

    mockCrudTodoRepository = new MockCrudTodoRepository(todos);

    const descricao = 'Descrição 1';
    const filteredTodos = await mockCrudTodoRepository.listTodoByDescription(descricao);

    expect(filteredTodos).toEqual(todos.filter((todo) => todo.description === descricao));
  });

  it('deve favoritar um todo com sucesso', async () => {
    const todo: Todo = {
      id: '1',
      title: 'Todo 1',
      description: 'Descrição 1',
      date: new Date(),
      favorite: false,
      status: false,
      deleted: null,
    };

    mockCrudTodoRepository = new MockCrudTodoRepository([todo]);

    const favoritedTodo = await mockCrudTodoRepository.favorite('1');

    expect(favoritedTodo.favorite).toBe(true);
  });

  it('deve atualizar um todo com sucesso', async () => {
    const todo: Todo = {
      id: '1',
      title: 'Todo 1',
      description: 'Descrição 1',
      date: new Date(),
      favorite: false,
      status: false,
      deleted: null,
    };

    mockCrudTodoRepository = new MockCrudTodoRepository([todo]);

    const updatedData: Todo = {
      ...todo,
      title: 'Todo Atualizado',
    };

    const updatedTodo = await mockCrudTodoRepository.updateTodo('1', updatedData);

    expect(updatedTodo).toEqual({
      ...todo,
      title: 'Todo Atualizado',
    });
  });

  it('deve excluir um todo com sucesso', async () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'Todo 1',
        description: 'Descrição 1',
        date: new Date(),
        favorite: false,
        status: false,
        deleted: null,
      },
      {
        id: '2',
        title: 'Todo 2',
        description: 'Descrição 2',
        date: new Date(),
        favorite: false,
        status: false,
        deleted: null,
      },
    ];

    mockCrudTodoRepository = new MockCrudTodoRepository(todos);

    await mockCrudTodoRepository.deleteTodo('1');

    const remainingTodos = await mockCrudTodoRepository.listTodos();

    expect(remainingTodos).toEqual([todos[1]]);
  });
});
