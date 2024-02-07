import { BaseRepository } from "@lib/database";
import { Users } from "../../domain/users/users.entity";

export class UsersRepository extends BaseRepository<Users>  {
  constructor() {
    super("Users")
  }


}
