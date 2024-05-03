import { UsersUseCase } from "../../../application/users/users.use-case";


export class CreateUsersController {
  constructor(
    private readonly useCase: UsersUseCase,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.useCase.createUser(this.body);
    return response
  }
}
