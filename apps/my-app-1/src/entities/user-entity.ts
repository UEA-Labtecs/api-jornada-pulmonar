import { IBaseEntity } from '@lib/database';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserEntity extends IBaseEntity {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
