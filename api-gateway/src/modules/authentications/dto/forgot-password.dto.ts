import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  phonenumber: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
