import { CrudTodoRepository } from '@/data/contracts';
import { TodoModel } from '@/data/models';
import { openDB } from '@/database/config';
import { v4 as uuid } from 'uuid';

export default class SQLiteRepository implements CrudTodoRepository {
  private db;

  constructor() {
    // Abra a conexão no construtor
    this.init();
  }

  // Altere para uma função assíncrona
  private async init() {
    try {
      this.db = await openDB();

      await this.initTable();
    } catch (error) {
      console.error('Error initializing SQLite repository:', error);
      throw error; // Rethrow the error to signal initialization failure
    }
  }

  private async initTable() {
    try {
      await this.db.exec(`
        CREATE TABLE IF NOT EXISTS todos (
          id TEXT PRIMARY KEY,
          title TEXT,
          description TEXT,
          date TEXT,
          favorite BOOLEAN DEFAULT 0,
          status BOOLEAN DEFAULT 0,
          deleted TEXT DEFAULT null
        )
      `);
    } catch (error) {
      console.error('Error initializing SQLite table:', error);
      throw error; // Rethrow the error to signal initialization failure
    }
  }

  async deletedatabase(): Promise<{ message: string }> {
    try {
      const stmt = await this.db.run('DELETE FROM todos');
      await stmt.finalize();

      return { message: 'Todos table cleared successfully.' };
    } catch (error) {
      console.error('Error clearing todos table:', error);
      throw error;
    }
  }





  async listTodos(): Promise<TodoModel[]> {
    try {
      const result = await this.db.all('SELECT * FROM todos');
      return result.map(row => ({
        id: row.id,
        title: row.title,
        description: row.description,
        date: row.date,
        favorite: row.favorite,
        status: row.status,
        deleted: row.deleted,
      }));
    } catch (error) {
      console.error('Error listing todos:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  async listTodoById(param): Promise<TodoModel> {
    try {
      const id = Number(param.id);

      const stmt = await this.db.prepare('SELECT * FROM todos WHERE id = ?');
      const result = await stmt.get(Number(id));
      await stmt.finalize();

      if (!result) {
        console.error('Todo not found');
        throw new Error('Todo not found');
      }

      const todo: TodoModel = {
        id: result.id,
        title: result.title,
        description: result.description,
        date: result.date,
        favorite: result.favorite,
        status: result.status,
        deleted: result.deleted,
      };

      return todo;
    } catch (error) {
      console.error('Error listing todos:', error);
      throw error;
    }
  }

  async listTodoByDescription(param): Promise<TodoModel[]> {
    try {
      const description = param.description;

      const stmt = await this.db.prepare(
        'SELECT * FROM todos WHERE description LIKE ?',
      );
      const result = await stmt.all(`%${description}%`);
      await stmt.finalize();

      if (!result) {
        console.error('Todo not found');
        throw new Error('Todo not found');
      }

      const todo: TodoModel[] = result.map((result) => ({
        id: result.id,
        title: result.title,
        description: result.description,
        date: result.date,
        favorite: result.favorite,
        status: result.status,
        deleted: result.deleted,
      }));

      return todo;
    } catch (error) {
      console.error('Error listing todos:', error);
      throw error;
    }
  }

  async createTodo(data: TodoModel): Promise<TodoModel> {
    try {
      const { id, title, description, date, favorite, status } = data;

      // Preparar a declaração de inserção
      const stmt = await this.db.prepare(
        'INSERT INTO todos (id, title, description, date, favorite, status) VALUES (?, ?, ?, ?, ?, ?)'
      );

      // Executar a declaração e obter o ID do item criado
      const result = await stmt.run([id, title, description, date, favorite, status]);

      // Finalizar a declaração
      await stmt.finalize();

      // Se o ID do item criado for obtido com sucesso, retornar o item
      return result
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error; // Rethrow the error for the calling code to handle
    }
  }

  async updateTodo(param: any, data: UpdateData): Promise<TodoModel> {
    try {
      const id = Number(param.id);
      const { title, description, date, favorite, status, deleted } = data;

      const updateFields = [
        'title',
        'description',
        'date',
        'favorite',
        'status',
        'deleted',
      ];
      const updateValues = [
        title,
        description,
        date,
        favorite,
        status,
        deleted,
      ];

      const setColumns = updateFields.filter(
        (field, index) => updateValues[index] !== undefined,
      );
      const setValues = updateValues.filter((value) => value !== undefined);

      if (setColumns.length === 0) {
        throw new Error('No fields to update provided.');
      }

      const setClause = setColumns.map((column) => `${column} = ?`).join(', ');

      const updateQuery = `
        UPDATE todos
        SET ${setClause}
        WHERE id = ?
      `;

      const stmt = await this.db.prepare(updateQuery);
      const result = await stmt.run([...setValues, id]);
      await stmt.finalize();

      if (result.changes > 0) {
        const todoUpdated = await this.listTodoById(param);
        return todoUpdated;
      } else {
        throw new Error('Todo not found');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  async deleteTodo(id: any): Promise<void> {
    try {
      const stmt = await this.db.prepare(
        'UPDATE todos SET deleted = true WHERE id = ?',
      );
      const result = await stmt.run(Number(id.id));
      await stmt.finalize();

      if (result.changes === 0) {
        throw new Error('Todo not found');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error; // ou retorne um código de erro específico, se preferir
    }
  }

  async favorite(id: any): Promise<TodoModel> {
    try {
      const todoId = Number(id.id);

      // Obtém o valor atual do campo 'favorite'
      const currentTodo = await this.db.get(
        'SELECT * FROM todos WHERE id = ?',
        [todoId],
      );

      if (!currentTodo) {
        throw new Error('Todo not found');
      }

      const newFavoriteValue = !currentTodo.favorite; // Inverte o valor

      // Atualiza o 'favorite' para o novo valor
      const updateStmt = await this.db.prepare(
        'UPDATE todos SET favorite = ? WHERE id = ?',
      );
      const updateResult = await updateStmt.run(newFavoriteValue, todoId);
      await updateStmt.finalize();

      // Verifica se algum Todo foi atualizado
      if (updateResult.changes === 0) {
        throw new Error('Todo not found');
      }

      // Busca o Todo atualizado após a atualização
      const updatedTodo = await this.db.get(
        'SELECT * FROM todos WHERE id = ?',
        [todoId],
      );

      // Retorna o Todo atualizado
      return updatedTodo;
    } catch (error) {
      console.error('Error favoriting todo:', error);
      throw error; // ou retorne um código de erro específico, se preferir
    }
  }
}

type UpdateData = Partial<TodoModel>;
