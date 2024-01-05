import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { SqlCacheService } from 'src/modules/redis/services';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      url: `redis:/default:default@${process.env.API_REDIS_HOST}:${process.env.API_REDIS_PORT}`,
    }),
  ],
  providers: [SqlCacheService],
  exports: [SqlCacheService],
})
export class RedisModule {}
