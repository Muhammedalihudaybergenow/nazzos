import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
@Injectable()
export class ManagerRoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
}
