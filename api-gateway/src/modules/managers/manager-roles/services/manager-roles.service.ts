import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateManagerRoleDto,
  UpdateManagerRoleDto,
  ManagerRoleQueryDto,
} from 'src/modules/managers/manager-roles/dto';
@Injectable()
export class ManagerRolesService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}
  create(createManagerRoleDto: CreateManagerRoleDto) {
    return this.client.send(
      { cmd: 'manager-role-create' },
      createManagerRoleDto,
    );
  }

  findAll(managerRoleQueryDto: ManagerRoleQueryDto) {
    return this.client.send(
      { cmd: 'manager-role-findall' },
      managerRoleQueryDto,
    );
  }

  findOne(id: number) {
    return this.client.send({ cmd: 'manager-role-findone' }, { id });
  }

  update(id: number, updateManagerRoleDto: UpdateManagerRoleDto) {
    return this.client.send(
      { cmd: 'manager-role-update' },
      { ...updateManagerRoleDto, id },
    );
  }

  remove(id: number) {
    return this.client.send({ cmd: 'manager-role-remove' }, { id });
  }
}
