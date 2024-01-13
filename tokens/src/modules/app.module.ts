import { Module } from '@nestjs/common';
import { TokensModule } from './tokens/tokens.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TokensModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `mongodb://${configService.get(
            'MONGODB_DATABASE_USERNAME',
          )}:${configService.get(
            'MONGODB_DATABASE_PASSWORD',
          )}@${configService.get('MONGODB_DATABASE_HOST')}:${configService.get(
            'MONGODB_DATABASE_PORT',
          )}`,
        };
      },
    }),
  ],
})
export class AppModule {}
