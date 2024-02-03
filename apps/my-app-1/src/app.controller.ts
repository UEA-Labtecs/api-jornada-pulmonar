import { Body, Controller, Get, Post, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user-entity';
import { DtoExceptionFilter } from '@lib/errors';

@Controller()
@UseFilters(new DtoExceptionFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() data: UserEntity): Promise<UserEntity> {
    return this.appService.createUser(data);
  }

  @Get('')
  async findAll(): Promise<UserEntity[]> {
    return this.appService.findAllUsers();
  }
}
