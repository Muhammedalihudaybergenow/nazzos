import { PartialType } from '@nestjs/swagger';
import { CreateManagerRoleDto } from './create-manager-role.dto';

export class UpdateManagerRoleDto extends PartialType(CreateManagerRoleDto) {
  id?: number;
}
