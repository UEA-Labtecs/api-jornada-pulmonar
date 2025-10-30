import { BaseRepository } from '@lib/database';
import { Questions } from '../../domain/questions/question.entity';

export class QuestionRepository extends BaseRepository<Questions> {
  constructor() {
    super('Questions');
  }
}
