import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { UsersUseCase } from '../jornada-pulmonar/application/users/users.use-case';
import { Users } from '../jornada-pulmonar/domain/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersUseCase,
  ) { }

  async login(user: Users): Promise<any> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.username,
      role: user.role
    };
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.userService.findByEmail(email.toLowerCase());
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Endereço de EMAIL ou SENHA incorreto.',
    );
  }
}
