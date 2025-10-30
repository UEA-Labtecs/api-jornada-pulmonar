import { BaseRepository } from '@lib/database';
import { Modules } from '../../domain/modules/modules.entity';

export class ModulesRepository extends BaseRepository<Modules> {
  constructor() {
    super('Modules');
  }
}
