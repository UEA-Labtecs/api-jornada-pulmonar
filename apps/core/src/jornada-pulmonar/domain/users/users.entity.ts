import { IBaseEntity } from "@lib/database";
import { Modules, UserResponses } from "@prisma/client";

export class Users extends IBaseEntity {
  id: string;
  username: string;
  email: string;
  password: string;
  imageBase64: string;
  role: string;
  score: number;
  modules?: Modules[];
  userResponses?: UserResponses[];
  createdAt: Date;
  updatedAt?: Date;
  answered: boolean;
}
