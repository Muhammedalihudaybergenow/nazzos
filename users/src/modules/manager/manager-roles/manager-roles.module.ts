import { Module } from '@nestjs/common';
import { ManagerRolesService } from './manager-roles.service';
import { ManagerRolesController } from './manager-roles.controller';

@Module({
  controllers: [ManagerRolesController],
  providers: [ManagerRolesService],
})
export class ManagerRolesModule {}
