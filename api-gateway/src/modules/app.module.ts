import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationsModule } from './authentications/authentications.module';
import { ManagersModule } from './managers/managers.module';
import { PublicsModule } from './publics/public.module';
import * as Joi from 'joi';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppResponseInterceptor } from 'src/common/interceptors';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_PORT: Joi.number().required(),
        RABBITMQ_USERS_QUEUE: Joi.string().required(),
        TYPEORM_USERS_DATABASE_NAME: Joi.string().required(),
        TYPEORM_USERS_DATABASE_USERNAME: Joi.string().required(),
        TYPEORM_USERS_DATABASE_PASSWORD: Joi.string().required(),
        TYPEORM_USERS_DATABASE_PORT: Joi.number().required(),
        TYPEORM_USERS_DATABASE_HOST: Joi.string().required(),
        API_REDIS_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthenticationsModule,
    ManagersModule,
    PublicsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get('TYPEORM_USERS_DATABASE_NAME'),
          username: config.get('TYPEORM_USERS_DATABASE_USERNAME'),
          password: config.get('TYPEORM_USERS_DATABASE_PASSWORD'),
          host: config.get('TYPEORM_USERS_DATABASE_HOST'),
          port: parseInt(config.get('TYPEORM_USERS_DATABASE_PORT')),
          synchronize: false,
          entities: ['dist/modules/authentications/entities/*.entity{.ts,.js}'],
        };
      },
    }),
    RedisModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor,
    },
  ],
})
export class AppModule {}
