import { Module } from '@nestjs/common';
import { ModulesRepository } from '../../jornada-pulmonar/application/modules/modules-repository';
import { ModulesController } from '../../jornada-pulmonar/presentation/modules.controller';

@Module({
  imports: [],
  controllers: [ModulesController],
  providers: [ModulesRepository],
})
export class ModulesModule {}
