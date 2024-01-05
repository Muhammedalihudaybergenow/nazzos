import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { LangEnum, UserStatusEnum } from 'src/common/enums';

export class RegistrationDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(61000000, { message: 'Please enter a valid phonenumber' })
  @Max(75999999, { message: 'Please enter a valid phonenumber' })
  phonenumber: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: 'enum',
    enum: LangEnum,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(LangEnum)
  lang: LangEnum;
}
