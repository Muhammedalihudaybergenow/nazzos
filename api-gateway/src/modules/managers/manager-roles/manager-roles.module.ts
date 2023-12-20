import { Module } from '@nestjs/common';
import { ManagerRolesService } from './services/manager-roles.service';
import { ManagerRolesController } from './controllers/manager-roles.controller';

@Module({
  controllers: [ManagerRolesController],
  providers: [ManagerRolesService],
})
export class ManagerRolesModule {}
