import { Module } from '@nestjs/common';
import { ManagerRolesService } from 'src/modules/manager/manager-roles/services';
import { ManagerRolesController } from 'src/modules/manager/manager-roles/controllers';
import { ManagerRoleRepository } from 'src/modules/manager/manager-roles/repositories';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [ManagerRolesController],
  providers: [ManagerRolesService, ManagerRoleRepository],
})
export class ManagerRolesModule {}
