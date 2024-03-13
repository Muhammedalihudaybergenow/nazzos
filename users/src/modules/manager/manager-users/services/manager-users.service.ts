import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateManagerUserDto,
  UpdateManagerUserDto,
  UserResponseDto,
  ManagerUserQueryDto,
} from 'src/modules/manager/manager-users/dto';
import { ManagerUserRepository } from 'src/modules/manager/manager-users/repositories';
import { UserEntity } from 'src/modules/manager/manager-users/entities';
@Injectable()
export class ManagerUsersService {
  constructor(private managerUserRepository: ManagerUserRepository) {}
  async create(createManagerUserDto: CreateManagerUserDto) {
    await this.phoneCheck(createManagerUserDto.phonenumber);
    const newUser =
      await this.managerUserRepository.createAndSave(createManagerUserDto);
    return new UserResponseDto(newUser);
  }

  findAll(dto: ManagerUserQueryDto) {
    return this.managerUserRepository.findAll(dto);
  }

  findOne(id: number) {
    return this.managerUserRepository.findOneWithRelations(id);
  }

  async update(updateManagerUserDto: UpdateManagerUserDto) {
    if (updateManagerUserDto.phonenumber) {
      await this.phoneCheck(updateManagerUserDto.phonenumber);
    }
    const updatedUser =
      await this.managerUserRepository.createAndSave(updateManagerUserDto);
    return new UserResponseDto(updatedUser);
  }

  remove(id: number) {
    return this.managerUserRepository.remove(new UserEntity({ id }));
  }

  private async phoneCheck(phone: string) {
    const phoneCheck = await this.managerUserRepository.findOneBy({
      phonenumber: phone,
    });
    if (phoneCheck) {
      throw new RpcException({
        message: `${phone} is already exists`,
        code: HttpStatus.METHOD_NOT_ALLOWED,
      });
    }
  }
}
