import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/modules/authentications/entities';
import { SqlCacheService } from 'src/modules/redis/services';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    private dataSource: DataSource,
    private sqlCacheService: SqlCacheService,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findOneByPhonenumber(phonenumber: number) {
    const query = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .leftJoinAndSelect('user.permissions', 'userPermissions')
      .where('user.phonenumber=:phonenumber', { phonenumber });
    return this.sqlCacheService.getOne(query);
  }

  findUserById(id: number) {
    const query = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .leftJoinAndSelect('user.permissions', 'userPermissions')
      .where('user.id=:userId', { userId: id });
    return this.sqlCacheService.getOne(query);
  }
}
