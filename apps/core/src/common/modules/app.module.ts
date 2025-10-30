import { Module } from '@nestjs/common';
import { QuestionModule } from './questions.module';
import { UsersModule } from './users.module';
import { ModulesModule } from './modules.module';
import { OptionsModule } from './options.module';
import { ResponsesModule } from './responses.module';
import { AuthModule } from '../../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AppService } from '../services/app.service';
import { UserResponsesModule } from './userResponses.module';
import { UploadModule } from './upload.module';

@Module({
  imports: [
    QuestionModule,
    UsersModule,
    ModulesModule,
    OptionsModule,
    ResponsesModule,
    UserResponsesModule,
    UploadModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
