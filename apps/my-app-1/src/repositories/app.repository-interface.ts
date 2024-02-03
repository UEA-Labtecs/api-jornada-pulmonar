import { BaseRepositoryAdapter } from '@lib/database';
import { UserEntity } from '../entities/user-entity';

export interface IAppRepository extends BaseRepositoryAdapter<UserEntity> {}
