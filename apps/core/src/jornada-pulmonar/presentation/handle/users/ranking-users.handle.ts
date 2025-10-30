import { UsersUseCase } from '../../../application/users/users.use-case';

export class RankingUsersController {
  constructor(
    private readonly useCase: UsersUseCase,
    private readonly query: any,
  ) {}
  async handle() {
    const response = await this.useCase.ranking(this.query);
    return response;
  }
}
