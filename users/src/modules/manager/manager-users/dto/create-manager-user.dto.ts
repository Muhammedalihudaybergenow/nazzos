import { ApiProperty } from '@nestjs/swagger';
import { LangEnum } from 'src/common/enums';

export class CreateManagerUserDto {
  firstName: string;
  lastName: string;
  phonenumber: number;
  password: string;
  lang: LangEnum;
}
