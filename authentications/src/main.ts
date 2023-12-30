import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
dotenv.config();
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        queue: process.env.RABBITMQ_AUTHS_QUEUE,
        noAck: false,
        urls: [
          `amqp://${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
