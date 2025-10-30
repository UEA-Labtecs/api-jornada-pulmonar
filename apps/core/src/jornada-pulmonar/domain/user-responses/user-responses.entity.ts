import { IBaseEntity } from '@lib/database';

export class UserResponses extends IBaseEntity {
  userId: string;
  questionId: string;
  choiceId: string;
  isCorrect: boolean;
}
