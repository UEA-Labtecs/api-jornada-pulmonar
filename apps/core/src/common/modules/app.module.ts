import { Module } from '@nestjs/common';
import { QuestionModule } from './questions.module';
import { UsersModule } from './users.module';
import { ModulesModule } from './modules.module';
import { OptionsModule } from './questions.module copy';

@Module({
  imports: [QuestionModule, UsersModule, ModulesModule, OptionsModule],
})
export class AppModule { }
