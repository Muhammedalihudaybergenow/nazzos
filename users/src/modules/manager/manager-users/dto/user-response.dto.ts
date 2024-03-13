import { LangEnum, UserStatusEnum } from 'src/common/enums';
import { RoleEntity } from 'src/modules/manager/manager-roles/entities';
import { PermissionEntity } from 'src/modules/manager/manager-permissions/entities';
import { UserEntity } from 'src/modules/manager/manager-users/entities';
export class UserResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  phonenumber: number;
  lang: LangEnum;
  status: UserStatusEnum;
  roles: RoleEntity[];
  permissions: PermissionEntity[];
  createdAt: number;
  loginAt: number;
  isSuperUser: boolean;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phonenumber = parseInt(user.phonenumber);
    this.lang = user.lang;
    this.status = user.status;
    this.roles = user.roles;
    this.permissions = user.permissions;
    this.createdAt = user.createdAt;
    this.loginAt = user.loginAt;
    this.isSuperUser = user.isSuperUser;
  }
}
