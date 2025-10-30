import { HttpResponse } from './http';

export interface Controller {
  handle: (param?: any, body?: any, query?: any) => Promise<HttpResponse>;
}
