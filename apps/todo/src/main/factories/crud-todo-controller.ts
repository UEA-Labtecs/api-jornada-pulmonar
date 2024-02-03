import { CrudTodoController } from '@/presentation/controllers';
import { Controller } from '@/presentation/contracts';
import SQLiteRepository from '@/infra/repositories/sqlite-todo';
import { CrudTodoService } from '@/data/services/crud-todo';
import { CrudTodoAction } from '../enums/crud-todo';

export const makeCrudTodoController = (action: CrudTodoAction): Controller => {
  const repo = new SQLiteRepository();
  const service = new CrudTodoService(repo);
  return new CrudTodoController(service, action);
};
