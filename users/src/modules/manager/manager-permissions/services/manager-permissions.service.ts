import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateManagerPermissionDto,
  ManagerPermissionQueryDto,
  UpdateManagerPermissionDto,
} from 'src/modules/manager/manager-permissions/dto';
import { ManagerPermissionRepository } from 'src/modules/manager/manager-permissions/repositories';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class ManagerPermissionsService {
  constructor(
    private managerPermissionRepository: ManagerPermissionRepository,
  ) {}
  async create(createManagerPermissionDto: CreateManagerPermissionDto) {
    await this.slugCheck(createManagerPermissionDto.slug);
    return this.managerPermissionRepository.createAndSave(
      createManagerPermissionDto,
    );
  }

  findAll(managerPermissionQueryDto: ManagerPermissionQueryDto) {
    return this.managerPermissionRepository.findAll(managerPermissionQueryDto);
  }

  findOne(id: number) {
    return this.managerPermissionRepository.findOneWithRelations(id);
  }

  update(updateManagerPermissionDto: UpdateManagerPermissionDto) {
    return this.managerPermissionRepository.createAndSave(
      updateManagerPermissionDto,
    );
  }

  remove(id: number) {
    return this.managerPermissionRepository.remove(
      new PermissionEntity({ id }),
    );
  }

  private async slugCheck(slug: string) {
    const slugCheck = await this.managerPermissionRepository.findOneBy({
      slug,
    });
    if (slugCheck) {
      throw new RpcException({
        msg: `${slug} is already exists`,
        code: HttpStatus.METHOD_NOT_ALLOWED,
      });
    }
  }
}
