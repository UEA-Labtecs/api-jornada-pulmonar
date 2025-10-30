import { Controller, Get, Query } from '@nestjs/common';
import { UserResponsesUseCase } from '../application/user-reponse/user-response.use-case';

@Controller('user-responses')
export class UserResponsesController {
  constructor(private readonly userResponsesUseCase: UserResponsesUseCase) {}

  /**
   * Busca todas as respostas de um usuário específico
   * GET /api/v1/user-responses?userId={userId}
   */
  @Get()
  async findAll(@Query('userId') userId?: string) {
    const query = userId ? { userId } : {};
    return await this.userResponsesUseCase.findAllResponse(query);
  }
}
