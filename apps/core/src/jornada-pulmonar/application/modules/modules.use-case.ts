import { Injectable } from '@nestjs/common';
import { ModulesRepository } from './modules-repository';
import { Modules } from '../../domain/modules/modules.entity';
import { IModulesUseCase } from '../../domain/modules/modules.use-case.contract';

@Injectable()
export class ModulesUseCase implements IModulesUseCase {

  constructor(
    private readonly modulesRepository: ModulesRepository,
  ) { }

  async createModule(data: Modules) {
    //regra de negócio
    return await this.modulesRepository.create(new Modules(data))
  };

  async updateModule(id: string, data: Modules) {
    //regra de negócio
    return await this.modulesRepository.update(id, data)
  };

  async findAllModule(query: string): Promise<Modules[]> {
    //regra de negócio
    console.log(query)
    return this.modulesRepository.findAll(query)
  }

  async deleteModule(id: string): Promise<void> {
    //regra de negócio
    return await this.modulesRepository.delete(id)
  }
}
