import { v4 as uuid } from "uuid";

export class IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt?: Date | null;
  constructor(
    props: Omit<IBaseEntity, "id" | "createdAt" | "updatedAt">,
    id?: string
  ) {
    this.id = id ?? uuid();
    Object.assign(this, props);
    this.createdAt = new Date();
    this.updatedAt = this.updatedAt ?? null;
  }
}
