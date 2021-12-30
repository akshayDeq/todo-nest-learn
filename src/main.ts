import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // import built-in ValidationPipe
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Nest Project Endpoints')
    .setDescription('All the todo & user Api endpoints')
    .setVersion('1.0')
    .addTag('Todo/User')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe()); // enable ValidationPipe`
  await app.listen(3000);
}
bootstrap();
