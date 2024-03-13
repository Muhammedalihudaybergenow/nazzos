import { LangEnum } from 'src/common/enums';

export class CreateManagerUserDto {
  firstName: string;
  lastName: string;
  phonenumber: string;
  password: string;
  lang: LangEnum;
  roleIds: number[];
  permissionIds: number[];
}
