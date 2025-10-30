import { BaseRepository } from '@lib/database';
import { Users } from '../../domain/users/users.entity';

export class UsersRepository extends BaseRepository<Users> {
  constructor() {
    super('Users');
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.findAll({ email });

    return user[0];
  }
}
