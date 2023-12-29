import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerRolesService } from '../services/manager-roles.service';
import { CreateManagerRoleDto } from '../dto/create-manager-role.dto';
import { UpdateManagerRoleDto } from '../dto/update-manager-role.dto';

@Controller('manager-roles')
export class ManagerRolesController {
  constructor(private readonly managerRolesService: ManagerRolesService) {}

  @Post()
  create(@Body() createManagerRoleDto: CreateManagerRoleDto) {
    return this.managerRolesService.create(createManagerRoleDto);
  }

  @Get()
  findAll() {
    return this.managerRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerRolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagerRoleDto: UpdateManagerRoleDto,
  ) {
    return this.managerRolesService.update(+id, updateManagerRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerRolesService.remove(+id);
  }
}
