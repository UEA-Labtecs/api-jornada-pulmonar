import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api/v1');

  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Smart Agriculture')
    .setDescription('API to manage platform entities')
    .setVersion('1.0')
    .addTag('Todo', 'Métodos para o gerenciamento de tarefas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log(`HTTP server listening at http://localhost:3000/`);
  });
}

bootstrap();
