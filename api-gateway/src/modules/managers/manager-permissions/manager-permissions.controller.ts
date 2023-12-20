import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManagerPermissionsService } from './manager-permissions.service';
import { CreateManagerPermissionDto } from './dto/create-manager-permission.dto';
import { UpdateManagerPermissionDto } from './dto/update-manager-permission.dto';

@Controller('manager-permissions')
export class ManagerPermissionsController {
  constructor(private readonly managerPermissionsService: ManagerPermissionsService) {}

  @Post()
  create(@Body() createManagerPermissionDto: CreateManagerPermissionDto) {
    return this.managerPermissionsService.create(createManagerPermissionDto);
  }

  @Get()
  findAll() {
    return this.managerPermissionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerPermissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManagerPermissionDto: UpdateManagerPermissionDto) {
    return this.managerPermissionsService.update(+id, updateManagerPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerPermissionsService.remove(+id);
  }
}
