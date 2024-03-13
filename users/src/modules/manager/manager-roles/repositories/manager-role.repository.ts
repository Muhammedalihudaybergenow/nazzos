import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import {
  UpdateManagerRoleDto,
  ManagerRoleQueryDto,
} from 'src/modules/manager/manager-roles/dto';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';

@Injectable()
export class ManagerRoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  createAndSave(dto: UpdateManagerRoleDto) {
    const entity = new RoleEntity(dto);
    if (dto.permissionIds) {
      entity.permissions = dto.permissionIds.map(
        (permissionId) =>
          new PermissionEntity({
            id: permissionId,
          }),
      );
    }
    return this.save(entity);
  }

  findAll(dto: ManagerRoleQueryDto) {
    const { limit, orderBy, orderDirection, page, search } = dto;
    const query = this.createQueryBuilder('roles');
    if (search) {
      query.where(`roles.slug ILIKE (:search) OR roles.name ILIKE (:search)`, {
        search: `%${search}%`,
      });
    }

    return query
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy(`roles.${orderBy}`, orderDirection)
      .getManyAndCount();
  }

  findOneWithRelations(id: number) {
    return this.createQueryBuilder('role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .where('role.id =:id', { id })
      .getOne();
  }
}
