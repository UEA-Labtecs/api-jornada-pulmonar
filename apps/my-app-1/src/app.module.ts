import { Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingModule } from '@lib/logging';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './repositories/app.repository';
import { DatabaseModule } from '@lib/database';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter, DtoExceptionFilter } from '@lib/errors';

@Module({
  imports: [LoggingModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    AppRepository,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_FILTER, useClass: DtoExceptionFilter },
  ],
})
export class AppModule {}
