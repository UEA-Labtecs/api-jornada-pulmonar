import { IBaseEntity } from "@lib/database";
import { Users } from "../users/users.entity";
import { Questions } from "../quetsions/question.entity";



export class Modules extends IBaseEntity {
  id: string;
  title: string;
  professor: Users;
  professorId: string;
  questions?: Questions[];
  createdAt: Date;
  updatedAt?: Date;
}


