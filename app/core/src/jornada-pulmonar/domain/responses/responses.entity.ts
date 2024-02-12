import { IBaseEntity } from "@lib/database";
import { Questions } from "../quetsions/question.entity";



export class Responses extends IBaseEntity {
  choiceId: string;
  questionId: string;
}
