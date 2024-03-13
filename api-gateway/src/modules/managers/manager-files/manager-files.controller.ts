import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Res,
} from '@nestjs/common';
import { ManagerFilesService } from './manager-files.service';
import { CreateManagerFileDto } from './dto/create-manager-file.dto';
import { UpdateManagerFileDto } from './dto/update-manager-file.dto';
import { Response } from 'express';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('manager-files')
export class ManagerFilesController {
  constructor(private readonly managerFilesService: ManagerFilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  create(@Body() body: CreateManagerFileDto, @Res() res: Response) {
    res.redirect(307, 'http://192.168.1.114:4000/books');
    // return this.managerFilesService.create(createManagerFileDto);
  }

  @Get()
  findAll() {
    console.log(true);
    return;
    // return this.managerFilesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.managerFilesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagerFileDto: UpdateManagerFileDto,
  ) {
    return this.managerFilesService.update(+id, updateManagerFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.managerFilesService.remove(+id);
  }
}
