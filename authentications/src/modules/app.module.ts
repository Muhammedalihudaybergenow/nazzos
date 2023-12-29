import { Module } from '@nestjs/common';
import { AuthenticationsModule } from './authentications/authentications.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
@Module({
  imports: [
    AuthenticationsModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      validationSchema: Joi.object({
        TYPEORM_DATABASE_NAME: Joi.string().required(),
        TYPEORM_DATABASE_USERNAME: Joi.string().required(),
        TYPEORM_DATABASE_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE_HOST: Joi.string().required(),
        TYPEORM_DATABASE_PORT: Joi.number().required(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_PORT: Joi.number().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get('TYPEORM_DATABASE_NAME'),
          username: config.get('TYPEORM_DATABASE_USERNAME'),
          password: config.get('TYPEORM_DATABASE_PASSWORD'),
          host: config.get('TYPEORM_DATABASE_HOST'),
          port: parseInt(config.get('TYPEORM_DATABASE_PORT')),
          synchronize: false,
          entities: ['dist/modules/**/entities/*{.ts,.js}'],
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
