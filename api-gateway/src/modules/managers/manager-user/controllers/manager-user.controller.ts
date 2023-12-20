import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ManagerUserService } from '../services/manager-user.service';
import { CreateManagerUserDto } from '../dto/create-manager-user.dto';
import { UpdateManagerUserDto } from '../dto/update-manager-user.dto';

@Controller('manager-user')
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
