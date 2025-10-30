export type HttpResponse<T = any> = {
  data: T | T[];
};

export type HttpRequest<T = any> = {
  data: T;
};

export const serverError = (error: Error): HttpResponse => ({
  data: error.stack,
});

export const ok = (data: HttpRequest): HttpResponse => ({
  data,
});

export const create = (data: HttpRequest): HttpResponse => ({
  ...data,
});
