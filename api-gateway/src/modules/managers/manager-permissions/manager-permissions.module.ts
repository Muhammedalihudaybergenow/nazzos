import { Module } from '@nestjs/common';
import { ManagerPermissionsService } from './manager-permissions.service';
import { ManagerPermissionsController } from './manager-permissions.controller';

@Module({
  controllers: [ManagerPermissionsController],
  providers: [ManagerPermissionsService],
})
export class ManagerPermissionsModule {}
