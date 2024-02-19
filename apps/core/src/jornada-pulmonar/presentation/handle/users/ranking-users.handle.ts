import { UsersUseCase } from "../../../application/users/users.use-case";


export class RankingUsersController {
  constructor(
    private readonly useCase: UsersUseCase,
  ) { }
  async handle() {
    const response = await this.useCase.ranking();
    return response
  }
}
