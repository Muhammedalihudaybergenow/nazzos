import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerUsersService } from 'src/modules/manager/manager-users/services';
import {
  CreateManagerUserDto,
  UpdateManagerUserDto,
  ManagerUserQueryDto,
} from 'src/modules/manager/manager-users/dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ManagerUsersController {
  constructor(private readonly managerUsersService: ManagerUsersService) {}

  @MessagePattern({ cmd: 'manager-user-create' })
  create(@Body() createManagerUserDto: CreateManagerUserDto) {
    return this.managerUsersService.create(createManagerUserDto);
  }

  @MessagePattern({ cmd: 'manager-user-findall' })
  findAll(@Payload() payload: ManagerUserQueryDto) {
    return this.managerUsersService.findAll(payload);
  }

  @MessagePattern({ cmd: 'manager-user-findone' })
  findOne(@Param('id') id: string) {
    return this.managerUsersService.findOne(+id);
  }

  @MessagePattern({ cmd: 'manager-user-update' })
  update(@Payload() payload: UpdateManagerUserDto) {
    return this.managerUsersService.update(payload);
  }

  @MessagePattern({ cmd: 'manager-user-remove' })
  remove(@Payload('id') id: string) {
    return this.managerUsersService.remove(+id);
  }
}
