import { PartialType } from '@nestjs/swagger';
import { CreateManagerPermissionDto } from './create-manager-permission.dto';

export class UpdateManagerPermissionDto extends PartialType(
  CreateManagerPermissionDto,
) {
  id?: number;
}
