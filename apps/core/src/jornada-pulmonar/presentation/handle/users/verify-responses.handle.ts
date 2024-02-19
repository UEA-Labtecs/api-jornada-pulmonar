import { UsersUseCase } from "../../../application/users/users.use-case";


export class VerifyResponseUserController {
  constructor(
    private readonly service: UsersUseCase,
    private readonly opitionId: string,
    private readonly questionId: string,
    private readonly userId: string,
    private readonly time: number,
  ) { }
  async handle() {
    const response = await this.service.verifyResponse(this.opitionId, this.questionId, this.userId, this.time);
    return response
  }
}
