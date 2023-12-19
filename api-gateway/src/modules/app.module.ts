import { Module } from '@nestjs/common';
import { ConfigModule} from '@nestjs/config';
import * as Joi from 'joi'
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['../.env','./env'],
    validationSchema: Joi.object({
      RABBIT_MQ_HOST: Joi.string().required(),
      RABBIT_MQ_PORT: Joi.number().required(),
    })
  })],

})
export class AppModule {}
