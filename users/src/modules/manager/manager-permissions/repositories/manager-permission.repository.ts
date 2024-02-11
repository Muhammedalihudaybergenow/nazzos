import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
import { UpdateManagerPermissionDto } from 'src/modules/manager/manager-permissions/dto';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
@Injectable()
export class ManagerPermissionRepository extends Repository<PermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }

  createAndSave(dto: UpdateManagerPermissionDto, id?: number) {
    const entity = new PermissionEntity(dto);
    if (dto.roleIds) {
      entity.roles = dto.roleIds.map(
        (roleId) => new RoleEntity({ id: roleId }),
      );
    }
    return this.save(entity);
  }
}
