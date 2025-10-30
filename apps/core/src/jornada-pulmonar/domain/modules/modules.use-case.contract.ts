import { Modules } from './modules.entity';

export interface IModulesUseCase {
  createModule: (data: Modules) => Promise<Modules>;
  findAllModule: (query?: any) => Promise<Modules[]>;
  updateModule: (id: string, data: Modules) => Promise<Modules>;
  deleteModule: (id: string) => Promise<void>;
}
