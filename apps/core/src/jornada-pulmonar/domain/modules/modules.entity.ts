import { IBaseEntity } from '@lib/database';
import { Users } from '../users/users.entity';
import { Questions } from '../questions/question.entity';

export class Modules extends IBaseEntity {
  id: string;
  title: string;
  teacher: Users;
  userId: string;
  questions?: Questions[];
  createdAt: Date;
  updatedAt?: Date;
}
