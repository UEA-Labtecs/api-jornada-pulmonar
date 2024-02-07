import { Controller, Get, Param, Post, Patch, Body, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateUsersController } from '../infra/make-create-users-controller.factory';


@ApiTags('Users')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('users')
export class UsersController {

  @Post()
  create(@Body() body: any) {
    const create = makeCreateUsersController(body);
    return create.handle();
  }


}

