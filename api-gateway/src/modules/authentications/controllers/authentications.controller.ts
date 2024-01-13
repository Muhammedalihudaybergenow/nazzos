import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationsService } from 'src/modules/authentications/services';
import { ApiTags } from '@nestjs/swagger';
import {
  LoginDto,
  TokenDto,
  OtpDto,
  RegistrationDto,
  ResetPasswordDto,
  ForgotPasswordDto,
} from 'src/modules/authentications/dto';
import { CurrentUser, Permissions } from 'src/common/decorators';
import { UserEntity } from '../entities';
@Controller({
  path: 'authentications',
  version: '1',
})
@ApiTags('Authentication Controller')
export class AuthenticationsController {
  constructor(
    private readonly authenticationsService: AuthenticationsService,
  ) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authenticationsService.login(body);
  }

  @Post('registration')
  registration(@Body() body: RegistrationDto) {
    return this.authenticationsService.registration(body);
  }

  @Post('otp')
  sendOtp(@Body() body: OtpDto) {
    return this.authenticationsService.sendOtp(body.phonenumber);
  }

  @Post('logout')
  @Permissions()
  logout(@Body() body: TokenDto, @CurrentUser() user: UserEntity) {
    return this.authenticationsService.logout(user, body.token);
  }

  @Post('validate/token')
  validateToken(@Body() body: TokenDto) {
    return this.authenticationsService.validateToken(body.token);
  }

  @Post('generate/token')
  generateToken(@Body() body: TokenDto) {
    return this.authenticationsService.generateToken(body.token);
  }

  @Post('reset/password')
  @Permissions()
  resetPassword(
    @Body() body: ResetPasswordDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.authenticationsService.resetPassword(body, user);
  }

  @Post('forgot/password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authenticationsService.forgotPassword(body);
  }
}
