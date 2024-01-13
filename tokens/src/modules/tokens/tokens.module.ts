import { Module } from '@nestjs/common';
import { TokensService } from './services/tokens.service';
import { TokensController } from './controllers/tokens.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from 'src/modules/tokens/schemas';
import { TokenModel } from 'src/modules/tokens/models';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Token',
        schema: TokenSchema,
      },
    ]),
  ],
  controllers: [TokensController],
  providers: [TokensService, TokenModel],
})
export class TokensModule {}
