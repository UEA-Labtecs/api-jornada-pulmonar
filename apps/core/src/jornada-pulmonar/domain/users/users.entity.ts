import { IBaseEntity } from "@lib/database";
import { Modules } from "@prisma/client";

export class Users extends IBaseEntity {
  id: string;
  username: string;
  email: string;
  role: string;
  modules?: Modules[];
  createdAt: Date;
  updatedAt?: Date;
}
