import { Controller, Param } from '@nestjs/common';
import {
  CreateManagerRoleDto,
  UpdateManagerRoleDto,
  ManagerRoleQueryDto,
} from 'src/modules/manager/manager-roles/dto';
import { ManagerRolesService } from 'src/modules/manager/manager-roles/services';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ManagerRolesController {
  constructor(private readonly managerRolesService: ManagerRolesService) {}

  @MessagePattern({ cmd: 'manager-role-create' })
  create(@Payload() createManagerRoleDto: CreateManagerRoleDto) {
    return this.managerRolesService.create(createManagerRoleDto);
  }

  @MessagePattern({ cmd: 'manager-role-findall' })
  findAll(@Payload() managerRoleQueryDto: ManagerRoleQueryDto) {
    return this.managerRolesService.findAll(managerRoleQueryDto);
  }

  @MessagePattern({ cmd: 'manager-role-findone' })
  findOne(@Payload('id') id: string) {
    return this.managerRolesService.findOne(+id);
  }

  @MessagePattern({ cmd: 'manager-role-update' })
  update(@Payload() payload: UpdateManagerRoleDto) {
    return this.managerRolesService.update(payload);
  }

  @MessagePattern({ cmd: 'manager-role-remove' })
  remove(@Param('id') id: string) {
    return this.managerRolesService.remove(+id);
  }
}
