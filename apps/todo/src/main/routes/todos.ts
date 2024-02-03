import { adaptRoute } from '@/main/adapters';
import { Router } from 'express';
import { makeCrudTodoController } from '../factories/crud-todo-controller';
import { CrudTodoAction } from '../enums/crud-todo';

export default (router: Router): void => {
  // Todo
  router.get(
    '/v1/todo',
    adaptRoute(makeCrudTodoController(CrudTodoAction.FIND)),
  );
  router.get(
    '/v1/todo/:description',
    adaptRoute(makeCrudTodoController(CrudTodoAction.FIND_BY_DESCRIPTION)),
  );
  router.get(
    '/v1/todo/favorite/:id',
    adaptRoute(makeCrudTodoController(CrudTodoAction.FAVORITE)),
  );
  router.post(
    '/v1/todo',
    adaptRoute(makeCrudTodoController(CrudTodoAction.CREATE)),
  );
  router.patch(
    '/v1/todo/:id',
    adaptRoute(makeCrudTodoController(CrudTodoAction.UPDATE)),
  );
  router.delete(
    '/v1/todo/:id',
    adaptRoute(makeCrudTodoController(CrudTodoAction.DELETE)),
  );
};
