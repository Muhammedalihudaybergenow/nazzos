import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from 'src/modules/authentications/repositories';
import {
  AuthResponseDto,
  LoginDto,
  RegistrationDto,
} from 'src/modules/authentications/dto';
import { UserStatusEnum } from 'src/common/enums';
import { HashHelper } from 'src/common/helpers';
import { TokenService } from './token.service';
import { OtpService } from './otp.service';
import { UserEntity } from 'src/modules/authentications/entities';
@Injectable()
export class AuthenticationsService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private otpService: OtpService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneByPhonenumber(
      dto.phonenumber,
    );
    if (!user) {
      throw new NotFoundException(`User ${dto.phonenumber} does not exist`);
    }
    if (user.status !== UserStatusEnum.ACTIVE) {
      throw new MethodNotAllowedException(`User disabled`);
    }
    const passportCheck = await HashHelper.compareHash(
      dto.password,
      user.password,
    );
    if (!passportCheck) {
      throw new BadRequestException(`Invalid credentials`);
    }
    const tokens = await this.tokenService.generateTokens({ id: user.id });
    return new AuthResponseDto(user, tokens);
  }

  async registration(dto: RegistrationDto) {
    const userCheck = await this.userRepository.findOneBy({
      phonenumber: dto.phonenumber,
    });
    if (userCheck) {
      throw new MethodNotAllowedException(
        `User ${dto.phonenumber} already registered`,
      );
    }
    const otp = await this.otpService.getOtp(dto.phonenumber);
    if (otp === dto.otp) {
      throw new ForbiddenException(`Otp not Corresponds`);
    }
    const now = new Date().getTime();
    const user = await this.userRepository.save(
      new UserEntity({
        firstName: dto.firstName,
        isSuperUser: false,
        createdAt: now,
        loginAt: now,
        lastName: dto.lastName,
        password: await HashHelper.getHash(dto.password),
        phonenumber: dto.phonenumber,
        status: UserStatusEnum.ACTIVE,
        lang: dto.lang,
      }),
    );
    const tokens = await this.tokenService.generateTokens({ id: user.id });
    return new AuthResponseDto(user, tokens);
  }

  async sendOtp(phonenumber: number) {
    await this.otpService.sendOtp(phonenumber);
    return 'Success';
  }
}
