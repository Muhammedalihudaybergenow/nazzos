import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from 'src/modules/authentications/repositories';
import {
  AuthResponseDto,
  ForgotPasswordDto,
  LoginDto,
  RegistrationDto,
  ResetPasswordDto,
} from 'src/modules/authentications/dto';
import { UserStatusEnum } from 'src/common/enums';
import { HashHelper } from 'src/common/helpers';
import { TokenService } from './token.service';
import { OtpService } from './otp.service';
import { UserEntity } from 'src/modules/authentications/entities';
import { ClientProxy } from '@nestjs/microservices';
import { JwtPayload } from '../interfaces';

@Injectable()
export class AuthenticationsService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private otpService: OtpService,
    @Inject('TOKEN_SERVICE') private client: ClientProxy,
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
    this.client.emit(
      { cmd: 'create-token' },
      {
        fcm: dto.fcmToken,
        userId: user.id,
        refresh: tokens.refresh,
      },
    );
    await this.userRepository.updateLoginAt(user);
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

  async logout(user: UserEntity, refresh: string) {
    return this.client.send(
      { cmd: 'delete-token' },
      { userId: user.id, refresh },
    );
  }

  async validateToken(token: string) {
    try {
      const result = await this.tokenService.validate(token);
      return {
        valid: true,
      };
    } catch (error) {
      return {
        valid: false,
      };
    }
  }

  async generateToken(token: string) {
    try {
      const result: JwtPayload = await this.tokenService.validate(token);
      const { id } = result;
      const user = await this.userRepository.findUserById(id);
      if (!user) {
        throw new NotFoundException(
          'User with these credentials does not exist',
        );
      }
      if (user.status !== UserStatusEnum.ACTIVE) {
        throw new ForbiddenException('User is not active');
      }
      return this.tokenService.generateAccessToken({
        id: user.id,
      });
    } catch (error) {
      throw new BadRequestException('Token is Invalid');
    }
  }

  async resetPassword(dto: ResetPasswordDto, user: UserEntity) {
    const checkPassword = await HashHelper.compareHash(
      dto.currentPassword,
      user.password,
    );
    if (!checkPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    user.password = await HashHelper.getHash(dto.newPassword);
    await this.userRepository.save(user);
    return true;
  }
  async forgotPassword(dto: ForgotPasswordDto) {
    const { newPassword, otp, phonenumber } = dto;
    const checkOtp = await this.otpService.getOtp(phonenumber);
    if (!checkOtp || checkOtp != otp) {
      throw new BadRequestException('Invalid OTP');
    }
    const user = await this.userRepository.findOneBy({
      phonenumber,
    });
    user.password = await HashHelper.getHash(newPassword);
    return true;
  }
}
