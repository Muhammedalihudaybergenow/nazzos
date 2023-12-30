import { Module } from '@nestjs/common';
import { ManagerModule } from './manager/manager.module';
import { ClientsModule } from './clients/clients.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
@Module({
  imports: [
    ManagerModule,
    ClientsModule,
    ConfigModule.forRoot({
      cache: true,
      validationOptions: Joi.object({
        TYPEORM_DATABASE_NAME: Joi.string().required(),
        TYPEORM_DATABASE_USERNAME: Joi.string().required(),
        TYPEORM_DATABASE_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE_PORT: Joi.number().required(),
        TYPEORM_DATABASE_HOST: Joi.string().required(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('TYPEORM_DATABASE_HOST'),
          username: configService.get('TYPEORM_DATABASE_USERNAME'),
          password: configService.get('TYPEORM_DATABASE_PASSWORD'),
          port: parseInt(configService.get('TYPEORM_DATABASE_PORT')),
          database: configService.get('TYPEORM_DATABASE_NAME'),
          entities: ['dist/modules/**/*entity.{js,ts}}'],
        };
      },
    }),
  ],
})
export class AppModule {}
