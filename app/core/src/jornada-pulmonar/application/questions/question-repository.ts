import { BaseRepository } from "@lib/database";
import { Questions } from "../../domain/quetsions/question.entity";

export class QuestionRepository extends BaseRepository<Questions>  {
  constructor() {
    super("Questions")
  }
}
