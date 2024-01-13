import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { HashHelper } from 'src/common/helpers';
import { CreateTokenDto, RemoveTokenDto } from 'src/modules/tokens/dto';
import { TokenModel } from 'src/modules/tokens/models';
@Injectable()
export class TokensService {
  constructor(private tokenModel: TokenModel) {}
  async create(createTokenDto: CreateTokenDto) {
    createTokenDto.refresh = await HashHelper.getCryptoHash(
      createTokenDto.refresh,
    );
    return this.tokenModel.createAndSave(createTokenDto);
  }

  async remove(dto: RemoveTokenDto) {
    dto.refresh = await HashHelper.getCryptoHash(dto.refresh);
    const token = await this.tokenModel.remove(dto.refresh, dto.userId);
    if (!token) {
      throw new RpcException({
        message: 'Token not found',
        code: 404,
      });
    }
    return 'Success';
  }
}
