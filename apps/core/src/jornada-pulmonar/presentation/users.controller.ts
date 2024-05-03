import { Controller, Get, Param, Post, Body, UsePipes, ValidationPipe, UseGuards, UseInterceptors, UploadedFile, Query, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateUsersController } from '../infra/users/make-create-users-controller.factory';
import { makeFindByEmailUsersController } from '../infra/users/make-find-by-email-users-controller.factory';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { makeRankingUsersController } from '../infra/users/make-ranking-users-controller.factory';
import { makeVerifyUserController } from '../infra/users/make-verify-response-controller.factory';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { FileDTO } from './dto/upload.dto';
// import { makeAddImgUsersController } from '../infra/users/make-add-img-users-controller.factory';


@ApiTags('Users')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('users')
export class UsersController {

  @IsPublic()
  @Post()
  create(@Body() body?: any) {
    const create = makeCreateUsersController(body);
    return create.handle();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    const findByEmail = makeFindByEmailUsersController(email.toLowerCase());
    return findByEmail.handle();
  }

  // @IsPublic()
  // @UseGuards(JwtAuthGuard)
  // @Patch(':id')
  // @UseInterceptors(FileInterceptor('file'))
  // addImgUser(@Param('id') id: string, @UploadedFile() file: FileDTO,) {
  //   const findByEmail = makeAddImgUsersController(id, file);
  //   return findByEmail.handle();
  // }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get()
  ranking(@Query() query: any) {
    const findByEmail = makeRankingUsersController(query);
    return findByEmail.handle();
  }

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Get(':optionId/:questionId/:userId/:time')
  verify(
    @Param('optionId') optionId: string,
    @Param('questionId') questionId: string,
    @Param('userId') userId: string,
    @Param('time') time: number
  ) {
    const verify = makeVerifyUserController(optionId, questionId, userId, time);
    return verify.handle();
  }
}

