import { BaseRepository } from "@lib/database";
import { UserResponses } from "../../domain/user-responses/user-responses.entity";

export class UserResponsesRepository extends BaseRepository<UserResponses> {
  constructor() {
    super("UserResponses")
  }
}
