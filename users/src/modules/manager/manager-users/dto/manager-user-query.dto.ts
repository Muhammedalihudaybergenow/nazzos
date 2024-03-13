import { PaginationDto } from 'src/common/dtos';
import { LangEnum, UserStatusEnum } from 'src/common/enums';

export class ManagerUserQueryDto extends PaginationDto {
  orderBy: string;
  startCreatedDate: number;
  endCreatedDate: number;
  status: UserStatusEnum;
  startLoginDate: number;
  endLoginDate: number;
  roleIds?: number[];
  permissionIds?: number[];
}
