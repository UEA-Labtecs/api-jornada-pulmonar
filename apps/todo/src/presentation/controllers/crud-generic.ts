import { Crud } from '@/domain/usecases/crud-generic';
import {
  Controller,
  HttpResponse,
  serverError,
  create,
  ok,
} from '@/presentation/contracts';
import { TodoViewModel } from '@/presentation/view-models';

export class CrudController implements Controller {
  // Crud precisa de um tipo de model para funcionar
  constructor(
    private readonly crud: Crud<any>,
    private readonly action: 'list' | 'create' | 'update' | 'delete',
  ) {}

  async handle(title?, param?): Promise<HttpResponse<any[]>> {
    try {
      let result;

      switch (this.action) {
        case 'list':
          result = await this.crud.list();
          break;
        case 'create':
          result = await this.crud.create(param);
          break;
        case 'update':
          result = await this.crud.update(title, param);
          break;
        case 'delete':
          result = await this.crud.delete(param);
          break;
        default:
          throw new Error('Invalid action');
      }

      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
