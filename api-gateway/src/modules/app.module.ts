import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationsModule } from './authentications/authentications.module';
import { ManagersModule } from './managers/managers.module';
import { PublicsModule } from './publics/public.module';

import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_PORT: Joi.number().required(),
        RABBITMQ_USERS_QUEUE: Joi.string().required(),
      }),
    }),
    AuthenticationsModule,
    ManagersModule,
    PublicsModule,
  ],
})
export class AppModule {}
