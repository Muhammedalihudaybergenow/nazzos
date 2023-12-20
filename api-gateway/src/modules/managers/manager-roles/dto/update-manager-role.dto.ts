import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerRoleDto } from './create-manager-role.dto';

export class UpdateManagerRoleDto extends PartialType(CreateManagerRoleDto) {}
