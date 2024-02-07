import { Options } from "./options.entity"

export interface IOptionsUseCase {
  createOption: (data: Options) => Promise<Options>
  findAllOption: (query?: any) => Promise<Options[]>
  updateOption: (id: string, data: Options) => Promise<Options>
  deleteOption: (id: string) => Promise<void>
}