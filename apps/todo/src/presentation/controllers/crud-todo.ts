import { CrudTodo } from '@/domain/usecases';
import { CrudTodoAction } from '@/main/enums/crud-todo';
import {
  Controller,
  HttpResponse,
  serverError,
  create,
  ok,
} from '@/presentation/contracts';
import { TodoViewModel } from '@/presentation/view-models';
import { v4 as uuid } from 'uuid'

export class CrudTodoController implements Controller {
  constructor(
    private readonly crudTodo: CrudTodo,
    private readonly action: CrudTodoAction,
  ) {}

  async handle(param?, data?, query?): Promise<HttpResponse<TodoViewModel[]>> {
    try {
      let result;
      query;
      switch (this.action) {
        case CrudTodoAction.FIND:
          result = await this.crudTodo.list();
          break;
        case CrudTodoAction.FIND_BY_DESCRIPTION:
          result = await this.crudTodo.listByDescription(param);
          break;
        case CrudTodoAction.CREATE:
          const id = uuid()
          result = await this.crudTodo.create({ id, ...data });
          break;
        case CrudTodoAction.UPDATE:
          result = await this.crudTodo.update(param, data);
          break;
        case CrudTodoAction.DELETE:
          result = await this.crudTodo.delete(param);
          break;
        case CrudTodoAction.FAVORITE:
          result = await this.crudTodo.favorite(param);
          break;
        default:
          throw new Error('Invalid action');
      }
      if (this.action === CrudTodoAction.CREATE) {
        return create(result);
      } else {
        return ok(result);
      }
    } catch (error) {
      return serverError(error);
    }
  }
}
