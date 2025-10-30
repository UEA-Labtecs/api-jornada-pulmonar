import { Module } from '@nestjs/common';
import { OptionsRepository } from '../../jornada-pulmonar/application/options/options-repository';
import { OptionsController } from '../../jornada-pulmonar/presentation/options.controller';

@Module({
  imports: [],
  controllers: [OptionsController],
  providers: [OptionsRepository],
})
export class OptionsModule {}
