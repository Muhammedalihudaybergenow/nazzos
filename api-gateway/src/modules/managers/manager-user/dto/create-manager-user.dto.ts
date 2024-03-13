import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { LangEnum, UserStatusEnum } from 'src/common/enums';

export class CreateManagerUserDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(61000000, {
    message: `Is Not a phonenumber`,
  })
  @Max(75999999, {
    message: `Is Not a phonenumber`,
  })
  phonenumber: number;

  @ApiProperty({
    type: 'enum',
    enum: LangEnum,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(LangEnum)
  lang: LangEnum;

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
    enum: UserStatusEnum,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEnum(UserStatusEnum)
  status: UserStatusEnum;

  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt({
    each: true,
  })
  roleIds: number[];

  @ApiProperty({
    type: [Number],
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsInt({
    each: true,
  })
  permissionIds: number[];
}
