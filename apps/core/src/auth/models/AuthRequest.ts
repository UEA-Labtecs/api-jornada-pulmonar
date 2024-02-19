import { Request } from 'express';
import { Users } from '../../jornada-pulmonar/domain/users/users.entity';

export interface AuthRequest extends Request {
  user: Users;
}
