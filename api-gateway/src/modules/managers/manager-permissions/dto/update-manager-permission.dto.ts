import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerPermissionDto } from './create-manager-permission.dto';

export class UpdateManagerPermissionDto extends PartialType(CreateManagerPermissionDto) {}
