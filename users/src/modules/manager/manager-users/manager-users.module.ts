import { Module } from '@nestjs/common';
import { ManagerUsersService } from './services/manager-users.service';
import { ManagerUsersController } from './controllers/manager-users.controller';

@Module({
  controllers: [ManagerUsersController],
  providers: [ManagerUsersService],
})
export class ManagerUsersModule {}
