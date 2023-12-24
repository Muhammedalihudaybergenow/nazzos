import { Module } from '@nestjs/common';
import { ManagerUsersService } from './manager-users.service';
import { ManagerUsersController } from './manager-users.controller';

@Module({
  controllers: [ManagerUsersController],
  providers: [ManagerUsersService],
})
export class ManagerUsersModule {}
