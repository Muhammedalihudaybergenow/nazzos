import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationsService } from 'src/modules/authentications/services';
import { ApiTags } from '@nestjs/swagger';
import {
  LoginDto,
  OtpDto,
  RegistrationDto,
} from 'src/modules/authentications/dto';
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
}
