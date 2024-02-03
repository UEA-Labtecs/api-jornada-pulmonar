import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingServiceInterceptor } from './logging.service';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingServiceInterceptor,
    },
  ],
})
export class LoggingModule {}
