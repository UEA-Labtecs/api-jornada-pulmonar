import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './common/modules/app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api/v1');

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // https://docs.nestjs.com/openapi/introduction
  const config = new DocumentBuilder()
    .setTitle('Smart Agriculture')
    .setDescription('API to manage platform entities')
    .setVersion('1.0')
    .addTag('Users', 'Métodos para o gerenciamento de usuários')
    .addTag('Properties', 'Métodos para o gerenciamento de propriedades')
    .addTag('Devices', 'Métodos para o gerenciamento de dispositivos')
    .addTag('Questions', 'Métodos para o gerenciamento de tarefas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT
  const HOST = '0.0.0.0'
  await app.listen(PORT, () => {
    console.log(
      `HTTP server listening at http://${HOST}:${PORT}/`,
    );
  });
}

bootstrap();