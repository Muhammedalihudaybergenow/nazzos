import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();
export class SwaggerConfiguration {
  static config() {
    return new DocumentBuilder()
      .setTitle('NAZZOS API')
      .setDescription(
        'NAZZOS API documentation made up according to the microservice architecture and built in nestjs',
      )
      .setVersion('1.0.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'bearer',
      })
      .build();
  }
}
