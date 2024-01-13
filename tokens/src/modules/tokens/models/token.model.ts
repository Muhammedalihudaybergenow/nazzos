import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Token } from 'src/modules/tokens/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTokenDto } from 'src/modules/tokens/dto';
@Injectable()
export class TokenModel {
  constructor(@InjectModel('Token') private tokenModel: Model<Token>) {}

  createAndSave(dto: CreateTokenDto) {
    const createdToken = new this.tokenModel(new Token(dto));
    return createdToken.save();
  }

  findUserFCM(userId: number) {
    return this.tokenModel.find<Token[]>({ userId }).exec();
  }

  findRefresh(refresh: string) {
    return this.tokenModel.findOne<Token>({ refresh }).exec();
  }

  remove(refresh: string, userId: number) {
    return this.tokenModel.findOneAndDelete({ refresh, userId }).exec();
  }
}
