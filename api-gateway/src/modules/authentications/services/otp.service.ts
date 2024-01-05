import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class OtpService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  public async sendOtp(phonenumber: number) {
    const checkOtp = await this.getOtp(phonenumber);
    if (!checkOtp) {
      const random = Math.floor(Math.random() * 10000);
      await this.cacheManager.set(
        `otp-${phonenumber}`,
        random,
        this.configService.get(`OPT_TTL`),
      );
    }
    return 'success';
  }

  public getOtp(phonenumber: number) {
    return this.cacheManager.get(`otp-${phonenumber}`);
  }
}
