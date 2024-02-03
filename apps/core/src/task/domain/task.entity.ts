import { IBaseEntity } from "@lib/database";

export class Task extends IBaseEntity {
  id: string;
  title: string;
  description: string;
  status: string;
  favorite: boolean
}

export enum IStatusTask {
  done = 'DONE',
  todo = 'TODO',
  trash = 'TRASH',
  draft = 'DRAFT',
  doing = 'DOING',
}
