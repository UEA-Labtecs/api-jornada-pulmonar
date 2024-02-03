import { PrismaClient, Prisma } from '@prisma/client';
import { BaseRepositoryAdapter } from './base-repository-adapter';
import { IBaseEntity } from '../types/base-entity';

const prisma = new PrismaClient();

export class BaseRepository<T extends IBaseEntity> implements BaseRepositoryAdapter<T> {
  private model: Prisma.ModelName;

  constructor(model: Prisma.ModelName) {
    this.model = model;
  }

  async create(item: T): Promise<T> {
    const createdItem = await prisma[this.model].create({
      data: { ...item },
    });
    return createdItem as T;
  }

  async findById(id: string | number): Promise<T | null> {
    const item = await prisma[this.model].findUnique({
      where: { id: id },
    });
    return item as T | null;
  }

  async update(id: string, data: T): Promise<T | null> {
    const updatedItem = await prisma[this.model].update({
      where: { id: id },
      data: { ...data, updatedAt: new Date() },
    });
    return updatedItem as T | null;
  }

  async softDelete(id: string): Promise<void> {
    await prisma[this.model].update({
      where: { id: id },
      data: { deletedAt: new Date() },
    });
  }

  async delete(id: string | number): Promise<void> {
    await prisma[this.model].delete({
      where: { id: id },
    });
  }

  async findAll(query?: any): Promise<T[]> {
    let whereCondition: Record<string, any> = {};

    if (query) {
      whereCondition = query;
    }
    const foundItems = await prisma[this.model].findMany({
      where: whereCondition,
    });

    return foundItems as T[];
  }

}
