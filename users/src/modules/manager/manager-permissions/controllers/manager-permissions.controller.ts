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
  UpdateManagerPermissionDto,
} from 'src/modules/manager/manager-permissions/dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'manager/permissions',
  version: '1',
})
@ApiTags('Manager Permissions Controller')
export class ManagerPermissionsController {
  constructor(
    private readonly managerPermissionsService: ManagerPermissionsService,
  ) {}

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
  update(
    @Param('id') id: string,
    @Body() updateManagerPermissionDto: UpdateManagerPermissionDto,
  ) {
    return this.managerPermissionsService.update(
      +id,
      updateManagerPermissionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerPermissionsService.remove(+id);
  }
}
