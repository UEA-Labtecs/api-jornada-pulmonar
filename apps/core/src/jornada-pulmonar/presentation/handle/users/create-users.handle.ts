import { UsersUseCase } from "../../../application/users/users.use-case";


export class CreateUsersController {
  constructor(
    private readonly useCase: UsersUseCase,
    private readonly file: any,
    private readonly body: any,
  ) { }
  async handle() {
    const response = await this.useCase.createUser(this.file, this.body);
    return response
  }
}
