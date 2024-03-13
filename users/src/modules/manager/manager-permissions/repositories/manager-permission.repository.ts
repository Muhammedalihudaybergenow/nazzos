import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
import {
  UpdateManagerPermissionDto,
  ManagerPermissionQueryDto,
} from 'src/modules/manager/manager-permissions/dto';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
@Injectable()
export class ManagerPermissionRepository extends Repository<PermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }

  createAndSave(dto: UpdateManagerPermissionDto) {
    const entity = new PermissionEntity(dto);
    if (dto.roleIds) {
      entity.roles = dto.roleIds.map(
        (roleId) => new RoleEntity({ id: roleId }),
      );
    }
    if (dto.id) {
      entity.id = dto.id;
    }
    return this.save(entity);
  }

  findAll(dto: ManagerPermissionQueryDto) {
    const { limit, orderBy, orderDirection, page, search } = dto;
    const query = this.createQueryBuilder('permissions');
    if (search) {
      query.where(
        `permissions.name ILIKE (:search) OR (permissions.slug ILIKE (:search))`,
        { search: `%${search}%` },
      );
    }

    return query
      .orderBy(`permissions.${orderBy}`, orderDirection)
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();
  }

  findOneWithRelations(id: number) {
    return this.createQueryBuilder('permission')
      .leftJoinAndSelect('permission.roles', 'roles')
      .where('permission.id =:id', { id })
      .getOne();
  }
}
