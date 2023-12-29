import { Injectable } from '@nestjs/common';
import { CreateManagerUserDto } from '../dto/create-manager-user.dto';
import { UpdateManagerUserDto } from '../dto/update-manager-user.dto';

@Injectable()
export class ManagerUsersService {
  create(createManagerUserDto: CreateManagerUserDto) {
    return 'This action adds a new managerUser';
  }

  findAll() {
    return `This action returns all managerUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerUser`;
  }

  update(id: number, updateManagerUserDto: UpdateManagerUserDto) {
    return `This action updates a #${id} managerUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} managerUser`;
  }
}
