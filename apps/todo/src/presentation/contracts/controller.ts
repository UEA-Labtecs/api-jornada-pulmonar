import { HttpResponse } from '@/presentation/contracts';

export interface Controller {
  handle: (param?: any, data?: any, query?: any) => Promise<HttpResponse>;
}
