import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { PaginationResponseDto } from 'src/common/dtos';
import {
  CreateManagerPermissionDto,
  ManagerPermissionQueryDto,
  UpdateManagerPermissionDto,
} from 'src/modules/managers/manager-permissions/dto';

@Injectable()
export class ManagerPermissionsService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}
  create(createManagerPermissionDto: CreateManagerPermissionDto) {
    return this.client.send(
      { cmd: 'manager-permission-create' },
      createManagerPermissionDto,
    );
  }

  findAll(dto: ManagerPermissionQueryDto) {
    return this.client
      .send(
        {
          cmd: 'manager-permission-findall',
        },
        dto,
      )
      .pipe(
        map(
          (res) =>
            new PaginationResponseDto(res[0], res[1], dto.page, dto.limit),
        ),
      );
  }

  findOne(id: number) {
    return this.client.send(
      {
        cmd: 'manager-permission-findone',
      },
      { id },
    );
  }

  update(id: number, updateManagerPermissionDto: UpdateManagerPermissionDto) {
    return this.client.send(
      {
        cmd: 'manager-permission-update',
      },
      {
        id,
        updateManagerPermissionDto,
      },
    );
  }

  remove(id: number) {
    return this.client.send(
      {
        cmd: 'manager-permission-remove',
      },
      { id },
    );
  }
}
