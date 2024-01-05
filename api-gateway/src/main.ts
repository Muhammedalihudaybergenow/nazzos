import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfiguration } from 'src/common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    prefix: 'v',
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const document = SwaggerModule.createDocument(
    app,
    SwaggerConfiguration.config(),
  );
  SwaggerModule.setup('docs/swagger', app, document);
  await app.listen(3000);
}
bootstrap();
