import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class SqlCacheService<T> {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  private sqlCacheCheck(query: SelectQueryBuilder<any>) {
    return this.cacheManager.get<any>(query.getSql());
  }

  private async sqlSetCache(query: SelectQueryBuilder<T>, result: any) {
    await this.cacheManager.set(
      query.getSql(),
      result,
      this.configService.get<number>('API_REDIS_CACHE_TTL'),
    );
    return result;
  }

  public async getOne(query: SelectQueryBuilder<T>): Promise<T> {
    const cacheCheck = await this.sqlCacheCheck(query);
    if (!cacheCheck) {
      return this.sqlSetCache(query, await query.getOne());
    }
    return cacheCheck;
  }

  public async getMany(query: SelectQueryBuilder<T>): Promise<T[]> {
    const cacheCheck = await this.sqlCacheCheck(query);
    if (!cacheCheck) {
      return this.sqlSetCache(query, await query.getMany());
    }
    return cacheCheck;
  }
}
