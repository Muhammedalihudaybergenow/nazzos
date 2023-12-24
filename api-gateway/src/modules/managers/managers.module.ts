import { Module } from '@nestjs/common';
import { ManagerUserModule } from './manager-user/manager-user.module';
import { ManagerRolesModule } from './manager-roles/manager-roles.module';
import { ManagerPermissionsModule } from './manager-permissions/manager-permissions.module';
@Module({
  imports: [ManagerUserModule, ManagerRolesModule, ManagerPermissionsModule],
})
export class ManagersModule {}
