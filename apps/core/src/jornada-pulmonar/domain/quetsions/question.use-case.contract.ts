import { Questions } from "./question.entity"

export interface IQuestionsUseCase {
  createQuestion: (data: Questions) => Promise<Questions>
  findAllQuestion: (query?: any) => Promise<Questions[]>
  updateQuestion: (id: string, data: Questions) => Promise<Questions>
  deleteQuestion: (id: string) => Promise<void>
}