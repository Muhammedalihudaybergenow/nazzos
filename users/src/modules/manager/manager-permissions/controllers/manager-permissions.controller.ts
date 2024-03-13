import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerPermissionsService } from 'src/modules/manager/manager-permissions/services';
import {
  CreateManagerPermissionDto,
  ManagerPermissionQueryDto,
  UpdateManagerPermissionDto,
} from 'src/modules/manager/manager-permissions/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ManagerPermissionsController {
  constructor(
    private readonly managerPermissionsService: ManagerPermissionsService,
  ) {}

  @MessagePattern({ cmd: 'manager-permission-create' })
  create(@Payload() createManagerPermissionDto: CreateManagerPermissionDto) {
    return this.managerPermissionsService.create(createManagerPermissionDto);
  }

  @MessagePattern({ cmd: 'manager-permission-findall' })
  findAll(@Payload() managerPermissionQueryDto: ManagerPermissionQueryDto) {
    return this.managerPermissionsService.findAll(managerPermissionQueryDto);
  }

  @MessagePattern({ cmd: 'manager-permission-findone' })
  findOne(@Payload('id') id: string) {
    return this.managerPermissionsService.findOne(+id);
  }

  @MessagePattern({ cmd: 'manager-permission-update' })
  update(@Body() updateManagerPermissionDto: UpdateManagerPermissionDto) {
    return this.managerPermissionsService.update(updateManagerPermissionDto);
  }

  @Delete(':id')
  @MessagePattern({ cmd: 'manager-permission-remove' })
  remove(@Param('id') id: string) {
    return this.managerPermissionsService.remove(+id);
  }
}
