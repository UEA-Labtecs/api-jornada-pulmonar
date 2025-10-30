import { BaseRepository } from '@lib/database';
import { Options } from '../../domain/options/options.entity';

export class OptionsRepository extends BaseRepository<Options> {
  constructor() {
    super('Options');
  }
}
