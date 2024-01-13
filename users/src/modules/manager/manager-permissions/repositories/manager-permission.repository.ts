import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
@Injectable()
export class ManagerPermissionRepository extends Repository<PermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }
}
