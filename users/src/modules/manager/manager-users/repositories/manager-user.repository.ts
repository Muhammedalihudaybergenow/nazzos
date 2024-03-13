import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/manager/manager-users/entities';
import { Injectable } from '@nestjs/common';
import {
  UpdateManagerUserDto,
  ManagerUserQueryDto,
} from 'src/modules/manager/manager-users/dto';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
import { HashHelper } from 'src/common/helpers';

@Injectable()
export class ManagerUserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createAndSave(dto: UpdateManagerUserDto) {
    const entity = new UserEntity(dto);
    if (dto.roleIds) {
      entity.roles = dto.roleIds.map(
        (roleId) =>
          new RoleEntity({
            id: roleId,
          }),
      );
    }
    if (dto.permissionIds) {
      entity.permissions = dto.permissionIds.map(
        (permissionId) => new PermissionEntity({ id: permissionId }),
      );
    }
    if (dto.password) {
      entity.password = await HashHelper.getHash(dto.password);
    }
    if (!dto.id) {
      entity.createdAt = new Date().getTime();
      entity.loginAt = new Date().getTime();
    }
    entity.isSuperUser = false;
    return this.save(entity);
  }

  findAll(dto: ManagerUserQueryDto) {
    const {
      endCreatedDate,
      endLoginDate,
      limit,
      orderBy,
      orderDirection,
      page,
      startCreatedDate,
      startLoginDate,
      status,
      search,
      permissionIds,
      roleIds,
    } = dto;
    const query = this.createQueryBuilder('users')
      .leftJoin('users.roles', 'roles')
      .leftJoin('users.permissions', 'permissions');
    if (search) {
      query.where(
        'users.firstName ILIKE (:search) OR users.lastName ILIKE (:search) OR users.phonenumber ILIKE (:search)',
        { search: `%${search}%` },
      );
    }
    if (permissionIds) {
      query.orWhere('permission.id IN (:...permissionIds)', { permissionIds });
    }
    if (roleIds) {
      query.orWhere('role.id IN (:...roleIds)', { roleIds });
    }
    if (startCreatedDate) {
      query.orWhere('users.createdAt > (:startCreatedDate)', {
        startCreatedDate,
      });
    }
    if (endCreatedDate) {
      query.orWhere('users.createdAt < (:endCreatedDate)', { endCreatedDate });
    }
    if (endLoginDate) {
      query.orWhere('users.loginAt < (:endLoginDate)', { endLoginDate });
    }
    if (startLoginDate) {
      query.orWhere('users.loginAt > (:startLoginDate)', { startLoginDate });
    }
    if (status) {
      query.orWhere('users.status = (:status)', { status });
    }
    return query
      .orderBy(`users.${orderBy}`, orderDirection)
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();
  }

  findOneWithRelations(id: number) {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('users.roles', 'roles')
      .leftJoinAndSelect('users.permissions', 'permissions')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .where('users.id =:id', { id })
      .getOne();
  }
}
