import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateManagerPermissionDto,
  UpdateManagerPermissionDto,
} from 'src/modules/manager/manager-permissions/dto';

@Injectable()
export class ManagerPermissionsService {
  constructor(@Inject('USERS_SERVICE') private usersClientProxy: ClientProxy) {}
  create(createManagerPermissionDto: CreateManagerPermissionDto) {
    return 'This action adds a new managerPermission';
  }

  findAll() {
    return `This action returns all managerPermissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerPermission`;
  }

  update(id: number, updateManagerPermissionDto: UpdateManagerPermissionDto) {
    return `This action updates a #${id} managerPermission`;
  }

  remove(id: number) {
    return `This action removes a #${id} managerPermission`;
  }
}
