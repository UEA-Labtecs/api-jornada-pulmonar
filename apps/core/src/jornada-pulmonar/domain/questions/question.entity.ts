import { IBaseEntity } from "@lib/database";
import { Options } from "../options/options.entity";
import { Modules } from "../modules/modules.entity";
import { Responses } from "../responses/responses.entity";

export class Questions extends IBaseEntity {
  title: string;
  imageBase64?: string;
  audioUrl?: string;
  options?: Options[];
  correctOption?: Options;
  moduleId?: string;
  module?: Modules;
  response?: Responses;
  answered?: Boolean;
}


