import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/manager/manager-users/entities';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ManagerUserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
