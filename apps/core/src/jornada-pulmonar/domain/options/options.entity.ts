import { IBaseEntity } from '@lib/database';
import { Questions } from '../questions/question.entity';

export class Options extends IBaseEntity {
  content: string;
  question: Questions;
  questionId: string;
  correct: boolean;
}
