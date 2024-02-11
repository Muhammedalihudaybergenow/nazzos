import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManagerPermissionDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'Manager Permission Create',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'manager.users.permissions.create',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    type: [Number],
    required: false,
    nullable: false,
    example: [1],
  })
  @IsOptional()
  @IsInt({
    each: true,
  })
  roleIds: number[];
}
