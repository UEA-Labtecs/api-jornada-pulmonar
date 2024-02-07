import { IBaseEntity } from "@lib/database";
import { Options } from "../options/options.entity";
import { Modules } from "../modules/modules.entity";

export class Questions extends IBaseEntity {
  content: string;
  options?: Options[];
  correctOption: Options;
  moduleId: string;
  module: Modules;
}


