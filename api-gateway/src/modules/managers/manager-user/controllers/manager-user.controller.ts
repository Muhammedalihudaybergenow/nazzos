import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerUserService } from 'src/modules/managers/manager-user/services';
import {
  CreateManagerUserDto,
  UpdateManagerUserDto,
} from 'src/modules/managers/manager-user/dto';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'manager/users',
  version: '1',
})
@ApiTags('Manager User Controller')
export class ManagerUserController {
  constructor(private readonly managerUserService: ManagerUserService) {}

  @Post()
  create(@Body() createManagerUserDto: CreateManagerUserDto) {
    return this.managerUserService.create(createManagerUserDto);
  }

  @Get()
  findAll() {
    return this.managerUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagerUserDto: UpdateManagerUserDto,
  ) {
    return this.managerUserService.update(+id, updateManagerUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerUserService.remove(+id);
  }
}
