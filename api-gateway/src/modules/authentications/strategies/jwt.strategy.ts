import { UserStatusEnum } from 'src/common/enums';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/modules/authentications/repositories';
import { JwtPayload } from 'src/modules/authentications/interfaces';
import { JWT_CONSTANT } from 'src/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_CONSTANT) {
  constructor(
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    if (!id) {
      throw new NotFoundException();
    }
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException();
    }
    if (user.status === UserStatusEnum.BLOCKED) {
      throw new ForbiddenException('User is blocked');
    }
    if (user.status === UserStatusEnum.DEACTIVE) {
      throw new ForbiddenException('User is deactived');
    }
    return user;
  }
}
