import { Injectable } from '@nestjs/common';
import { CreateManagerFileDto } from './dto/create-manager-file.dto';
import { UpdateManagerFileDto } from './dto/update-manager-file.dto';

@Injectable()
export class ManagerFilesService {
  create(createManagerFileDto: CreateManagerFileDto) {
    return 'This action adds a new managerFile';
  }

  findAll() {
    return `This action returns all managerFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerFile`;
  }

  update(id: number, updateManagerFileDto: UpdateManagerFileDto) {
    return `This action updates a #${id} managerFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} managerFile`;
  }
}
