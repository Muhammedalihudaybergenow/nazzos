import { Module } from '@nestjs/common';
import {
  AuthenticationsService,
  OtpService,
  TokenService,
} from 'src/modules/authentications/services';
import { AuthenticationsController } from './controllers/authentications.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity, RoleEntity, UserEntity } from './entities';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/authentications/repositories';
import { JwtStrategy } from 'src/modules/authentications/strategies';
import { RedisModule } from '../redis/redis.module';
import { SqlCacheService } from 'src/modules/redis/services';

@Module({
  controllers: [AuthenticationsController],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secretOrPrivateKey: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get('JWT_ACCESS_EXPIRES_IN'),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([PermissionEntity, RoleEntity, UserEntity]),
    RedisModule,
  ],
  providers: [
    AuthenticationsService,
    UserRepository,
    JwtService,
    ConfigService,
    TokenService,
    JwtStrategy,
    SqlCacheService,
    OtpService,
  ],
})
export class AuthenticationsModule {}
