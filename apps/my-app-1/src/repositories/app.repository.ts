import { BaseRepository } from '@lib/database';
import { UserEntity } from '../entities/user-entity';
import { IAppRepository } from './app.repository-interface';

export class AppRepository
  extends BaseRepository<UserEntity>
  implements IAppRepository
{
  findById(id: string | number): Promise<UserEntity> {
    return super.findById(id);
  }

  async create(item: UserEntity): Promise<UserEntity> {
    return super.create(item);
  }

  async update(item: UserEntity): Promise<UserEntity> {
    return super.update(item);
  }

  async delete(id: string | number): Promise<boolean> {
    return super.delete(id);
  }

  findAll(): Promise<UserEntity[]> {
    return super.findAll();
  }
}
