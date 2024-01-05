import { LangEnum, UserStatusEnum } from 'src/common/enums';
import {
  RoleEntity,
  PermissionEntity,
  UserEntity,
} from 'src/modules/authentications/entities';
import { TokenInterface } from 'src/modules/authentications/interfaces';
export class AuthResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  phonenumber: number;
  lang: LangEnum;
  isSuperUser: boolean;
  status: UserStatusEnum;
  createdAt: number;
  loginAt: number;
  roles: RoleEntity[];
  permissions: PermissionEntity[];
  tokens: TokenInterface;

  constructor(user: UserEntity, tokens: TokenInterface) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phonenumber = user.phonenumber;
    this.lang = user.lang;
    this.isSuperUser = user.isSuperUser;
    this.status = user.status;
    this.createdAt = user.createdAt;
    this.loginAt = user.loginAt;
    this.roles = user.roles;
    this.permissions = user.permissions;
    this.tokens = tokens;
  }
}
