import { Module } from '@nestjs/common';
import { AuthenticationsModule } from './authentications/authentications.module';

@Module({
  imports: [AuthenticationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
