import { Module } from '@nestjs/common';
import { ManagerPermissionsService } from './services/manager-permissions.service';
import { ManagerPermissionsController } from './controllers/manager-permissions.controller';

@Module({
  controllers: [ManagerPermissionsController],
  providers: [ManagerPermissionsService],
})
export class ManagerPermissionsModule {}
