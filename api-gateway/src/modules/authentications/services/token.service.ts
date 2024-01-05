import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  TokenInterface,
  JwtPayload,
} from 'src/modules/authentications/interfaces';
import { Injectable } from '@nestjs/common';
@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(payload: JwtPayload) {
    try {
      return {
        token: await this.jwtService.signAsync(payload, {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
        }),
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN'),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async generateRefreshToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });
  }

  async generateTokens(payload: JwtPayload): Promise<TokenInterface> {
    return {
      access: await this.generateAccessToken(payload),
      refresh: await this.generateRefreshToken(payload),
    };
  }

  async validate(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
