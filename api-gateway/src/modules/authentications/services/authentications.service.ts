import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from 'src/modules/authentications/dto';
@Injectable()
export class AuthenticationsService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  login(dto: LoginDto) {
    return this.client.emit({ cmd: 'login' }, dto);
  }
}
