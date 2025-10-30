import { UserResponses } from './user-responses.entity';

export interface IUserResponsesUseCase {
  createResponse: (data: UserResponses) => Promise<UserResponses>;
  findAllResponse: (query?: any) => Promise<UserResponses[]>;
  updateResponse: (id: string, data: UserResponses) => Promise<UserResponses>;
  deleteResponse: (id: string) => Promise<void>;
}
