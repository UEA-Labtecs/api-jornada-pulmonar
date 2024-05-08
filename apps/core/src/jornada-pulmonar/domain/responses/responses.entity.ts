import { IBaseEntity } from "@lib/database";

export class Responses extends IBaseEntity {
  choiceId: string;
  questionId: string;
  isCorrect: boolean
}
