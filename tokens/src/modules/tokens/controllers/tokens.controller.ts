import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TokensService } from 'src/modules/tokens/services';
import {
  CreateTokenDto,
  UserTokenDto,
  RemoveTokenDto,
} from 'src/modules/tokens/dto';
@Controller()
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @MessagePattern({ cmd: 'create-token' })
  create(@Payload() createTokenDto: CreateTokenDto) {
    return this.tokensService.create(createTokenDto);
  }

  @MessagePattern({ cmd: 'delete-token' })
  remove(@Payload() removeTokenDto: RemoveTokenDto) {
    return this.tokensService.remove(removeTokenDto);
  }
}
