import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerUserDto } from './create-manager-user.dto';

export class UpdateManagerUserDto extends PartialType(CreateManagerUserDto) {}
