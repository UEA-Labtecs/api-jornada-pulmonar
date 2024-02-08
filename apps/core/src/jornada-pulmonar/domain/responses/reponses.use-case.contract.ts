import { Responses } from "./responses.entity"

export interface IResponsesUseCase {
  createResponse: (data: Responses) => Promise<Responses>
  findAllResponse: (query?: any) => Promise<Responses[]>
  updateResponse: (id: string, data: Responses) => Promise<Responses>
  deleteResponse: (id: string) => Promise<void>
}