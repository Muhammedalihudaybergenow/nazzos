import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerRolesService } from 'src/modules/managers/manager-roles/services';
import {
  CreateManagerRoleDto,
  UpdateManagerRoleDto,
} from 'src/modules/managers/manager-roles/dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'manager/roles',
  version: '1',
})
@ApiTags('Manager Roles Controller')
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
