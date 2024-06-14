import { Questions } from "./question.entity"

export interface IQuestionsUseCase {
  createQuestion: (file: any, data: any) => Promise<any>
  createQuestinModule: (file: any, data: any) => Promise<any>
  findAllQuestion: (query?: any) => Promise<Questions[]>
  updateQuestion: (id: string, data: Questions) => Promise<any>
  deleteQuestion: (id: string) => Promise<void>
}