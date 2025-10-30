import { BaseRepository } from '@lib/database';
import { Responses } from '../../domain/responses/responses.entity';

export class ResponsesRepository extends BaseRepository<Responses> {
  constructor() {
    super('Responses');
  }
}
