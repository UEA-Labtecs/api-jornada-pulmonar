import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DtoExceptionFilter } from '@lib/errors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DtoExceptionFilter());
  await app.listen(3000);
}
bootstrap();
