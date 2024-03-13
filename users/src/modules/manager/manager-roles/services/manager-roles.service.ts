import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateManagerRoleDto,
  ManagerRoleQueryDto,
  UpdateManagerRoleDto,
} from 'src/modules/manager/manager-roles/dto';
import { ManagerRoleRepository } from 'src/modules/manager/manager-roles/repositories';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class ManagerRolesService {
  constructor(private managerRoleRepository: ManagerRoleRepository) {}
  async create(createManagerRoleDto: CreateManagerRoleDto) {
    await this.slugCheck(createManagerRoleDto.slug);
    return this.managerRoleRepository.createAndSave(createManagerRoleDto);
  }

  findAll(managerRoleQueryDto: ManagerRoleQueryDto) {
    return this.managerRoleRepository.findAll(managerRoleQueryDto);
  }

  findOne(id: number) {
    return this.managerRoleRepository.findOneWithRelations(id);
  }

  async update(updateManagerRoleDto: UpdateManagerRoleDto) {
    if (updateManagerRoleDto.slug) {
      await this.slugCheck(updateManagerRoleDto.slug);
    }
    return this.managerRoleRepository.createAndSave(updateManagerRoleDto);
  }

  remove(id: number) {
    return this.managerRoleRepository.remove(new RoleEntity({ id }));
  }

  private async slugCheck(slug: string) {
    const slugCheck = await this.managerRoleRepository.findOneBy({
      slug,
    });
    if (slugCheck) {
      throw new RpcException({
        message: `${slug} is already exists`,
        code: HttpStatus.METHOD_NOT_ALLOWED,
      });
    }
  }
}
