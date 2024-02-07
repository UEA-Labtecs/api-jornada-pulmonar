import { Users } from "./users.entity"

export interface IUsersUseCase {
  createUser: (data: Users) => Promise<Users>
  findAllUser: (query?: any) => Promise<Users[]>
  updateUser: (id: string, data: Users) => Promise<Users>
  deleteUser: (id: string) => Promise<void>
}