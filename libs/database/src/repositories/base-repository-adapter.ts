import { IBaseEntity } from '../types/base-entity';

export abstract class BaseRepositoryAdapter<T extends IBaseEntity> {
  abstract create(item: T): Promise<T>;
  abstract findById(id: string | number): Promise<T | null>;
  abstract update(id: string, data: T): Promise<T | null>;
  abstract delete(id: string | number): Promise<void>;
  abstract findAll(): Promise<T[]>;
}
