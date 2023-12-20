import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationsModule } from './authentications/authentications.module';
import { ManagersModule } from './managers/managers.module';
import { PublicsModule } from './publics/public.module';
import { ClientsModule } from './clients/clients.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env', './env'],
      validationSchema: Joi.object({
        RABBIT_MQ_HOST: Joi.string().required(),
        RABBIT_MQ_PORT: Joi.number().required(),
      }),
    }),
    AuthenticationsModule,
    ManagersModule,
    PublicsModule,
    ClientsModule,
  ],
})
export class AppModule {}
