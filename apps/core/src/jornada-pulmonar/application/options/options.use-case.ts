import { Injectable } from '@nestjs/common';
import { OptionsRepository } from './options-repository';
import { Options } from '../../domain/options/options.entity';
import { IOptionsUseCase } from '../../domain/options/options.use-case.contract';

@Injectable()
export class OptionsUseCase implements IOptionsUseCase {
  constructor(private readonly optionsRepository: OptionsRepository) {}

  async createOption(data: Options) {
    //regra de negócio
    return await this.optionsRepository.create(new Options(data));
  }

  async updateOption(id: string, data: Options) {
    //regra de negócio
    return await this.optionsRepository.update(id, data);
  }

  async findAllOption(query): Promise<Options[]> {
    //regra de negócio
    return this.optionsRepository.findAll(query);
  }

  async deleteOption(id: string): Promise<void> {
    //regra de negócio
    return await this.optionsRepository.delete(id);
  }
}
