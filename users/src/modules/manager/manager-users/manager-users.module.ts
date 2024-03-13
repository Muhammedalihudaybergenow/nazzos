import { Module } from '@nestjs/common';
import { ManagerUsersService } from 'src/modules/manager/manager-users/services';
import { ManagerUsersController } from 'src/modules/manager/manager-users/controllers';
import { UserEntity } from 'src/modules/manager/manager-users/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerUserRepository } from 'src/modules/manager/manager-users/repositories';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [ManagerUsersController],
  providers: [ManagerUsersService, ManagerUserRepository],
})
export class ManagerUsersModule {}
