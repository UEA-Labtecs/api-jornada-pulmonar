import { FileDTO } from "../../presentation/dto/upload.dto"
import { Users } from "./users.entity"

export interface IUsersUseCase {
  createUser: (file: FileDTO, data: Users) => Promise<Users>
  findAllUser: (query?: any) => Promise<Users[]>
  findByEmail: (email: string) => Promise<Users>
  updateUser: (id: string, data: Users) => Promise<Users>
  deleteUser: (id: string) => Promise<void>

  ranking: (query: any) => Promise<Users[]>
  verifyResponse: (optionId: string, questionId: string, userId: string, time: number) => Promise<{ message: string }>
}