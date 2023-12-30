import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPhone } from 'src/common/decorators';

export class LoginDto {
  @IsPhone()
  phonenumber: number;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'Hello123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  fcmToken: string;
}
