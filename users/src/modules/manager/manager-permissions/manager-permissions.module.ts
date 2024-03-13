import { Module } from '@nestjs/common';
import { ManagerPermissionsService } from 'src/modules/manager/manager-permissions/services';
import { ManagerPermissionsController } from 'src/modules/manager/manager-permissions/controllers';
import { ManagerPermissionRepository } from 'src/modules/manager/manager-permissions/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [ManagerPermissionsController],
  providers: [ManagerPermissionsService, ManagerPermissionRepository],
})
export class ManagerPermissionsModule {}
