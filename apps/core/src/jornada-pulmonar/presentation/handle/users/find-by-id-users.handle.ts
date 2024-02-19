import { UsersUseCase } from "../../../application/users/users.use-case";


export class FindByEmailUsersController {
  constructor(
    private readonly useCase: UsersUseCase,
    private readonly email: string,
  ) { }
  async handle() {
    const response = await this.useCase.findByEmail(this.email);
    return response
  }
}
