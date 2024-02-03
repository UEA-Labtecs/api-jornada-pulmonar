export interface Crud<T> {
  create: (data: T) => Promise<T>;
  list: () => Promise<T[]>;
  update: (id: string, data: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
}
