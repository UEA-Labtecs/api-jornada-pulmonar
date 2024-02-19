import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { makeCreateResponsesController } from '../infra/responses/make-create-responses-controller.factory';
import { IsPublic } from '../../auth/decorators/is-public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';


@ApiTags('Responses')
@UsePipes(new ValidationPipe({ forbidNonWhitelisted: true, whitelist: true }))
@Controller('responses')
export class ResponsesController {

  @IsPublic()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    const create = makeCreateResponsesController(body);
    return create.handle();
  }


}

