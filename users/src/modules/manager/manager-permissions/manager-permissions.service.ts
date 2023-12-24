import { Injectable } from '@nestjs/common';
import { CreateManagerPermissionDto } from './dto/create-manager-permission.dto';
import { UpdateManagerPermissionDto } from './dto/update-manager-permission.dto';

@Injectable()
export class ManagerPermissionsService {
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
