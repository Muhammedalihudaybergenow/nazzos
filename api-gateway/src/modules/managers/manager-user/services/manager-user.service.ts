import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateManagerUserDto,
  UpdateManagerUserDto,
} from 'src/modules/managers/manager-user/dto';
@Injectable()
export class ManagerUserService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}
  create(createManagerUserDto: CreateManagerUserDto) {
    return this.client.send(
      { cmd: 'manager-user-create' },
      createManagerUserDto,
    );
  }

  findAll() {
    return `This action returns all managerUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} managerUser`;
  }

  update(id: number, updateManagerUserDto: UpdateManagerUserDto) {
    return this.client.send(
      { cmd: 'manager-user-update' },
      { id, ...updateManagerUserDto },
    );
  }

  remove(id: number) {
    return this.client.send({ cmd: 'manager-user-remove' }, { id });
  }
}
