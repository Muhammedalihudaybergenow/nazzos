import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerFileDto } from './create-manager-file.dto';

export class UpdateManagerFileDto extends PartialType(CreateManagerFileDto) {}
