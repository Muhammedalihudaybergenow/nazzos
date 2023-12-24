import { Module } from '@nestjs/common';
import { ManagerUsersModule } from './manager-users/manager-users.module';
import { ManagerRolesModule } from './manager-roles/manager-roles.module';
import { ManagerPermissionsModule } from './manager-permissions/manager-permissions.module';

@Module({
  imports: [ManagerUsersModule, ManagerRolesModule, ManagerPermissionsModule]
})
export class ManagerModule {}
