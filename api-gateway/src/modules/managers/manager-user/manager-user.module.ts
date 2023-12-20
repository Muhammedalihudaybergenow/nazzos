import { Module } from '@nestjs/common';
import { ManagerUserService } from './services/manager-user.service';
import { ManagerUserController } from './controllers/manager-user.controller';

@Module({
  controllers: [ManagerUserController],
  providers: [ManagerUserService],
})
export class ManagerUserModule {}
