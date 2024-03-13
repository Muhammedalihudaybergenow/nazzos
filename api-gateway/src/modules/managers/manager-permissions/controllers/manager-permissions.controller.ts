import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManagerPermissionsService } from 'src/modules/managers/manager-permissions/services';
import {
  CreateManagerPermissionDto,
  UpdateManagerPermissionDto,
  ManagerPermissionQueryDto,
} from 'src/modules/managers/manager-permissions/dto';
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
  findAll(@Query() query: ManagerPermissionQueryDto) {
    return this.managerPermissionsService.findAll(query);
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
