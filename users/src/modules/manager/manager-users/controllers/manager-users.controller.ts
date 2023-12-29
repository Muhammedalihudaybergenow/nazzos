import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerUsersService } from '../services/manager-users.service';
import { CreateManagerUserDto } from '../dto/create-manager-user.dto';
import { UpdateManagerUserDto } from '../dto/update-manager-user.dto';

@Controller('manager-users')
export class ManagerUsersController {
  constructor(private readonly managerUsersService: ManagerUsersService) {}

  @Post()
  create(@Body() createManagerUserDto: CreateManagerUserDto) {
    return this.managerUsersService.create(createManagerUserDto);
  }

  @Get()
  findAll() {
    return this.managerUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerUsersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagerUserDto: UpdateManagerUserDto,
  ) {
    return this.managerUsersService.update(+id, updateManagerUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerUsersService.remove(+id);
  }
}
