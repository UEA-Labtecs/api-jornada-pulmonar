import { BaseRepository } from "@lib/database";
import { IQuestionRepository } from "../../domain/quetsions/question-repository.contract";
import { Questions } from "../../domain/quetsions/question.entity";

export class QuestionRepository extends BaseRepository<Questions>  {
  constructor() {
    super("Questions")
  }


}
