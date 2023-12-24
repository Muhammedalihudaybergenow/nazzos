import { Injectable } from '@nestjs/common';
import { CreateManagerRoleDto } from './dto/create-manager-role.dto';
import { UpdateManagerRoleDto } from './dto/update-manager-role.dto';

@Injectable()
export class ManagerRolesService {
  create(createManagerRoleDto: CreateManagerRoleDto) {
    return 'This action adds a new managerRole';
  }

  findAll() {
    return `This action returns all managerRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerRole`;
  }

  update(id: number, updateManagerRoleDto: UpdateManagerRoleDto) {
    return `This action updates a #${id} managerRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} managerRole`;
  }
}
