import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManagerRoleDto {
  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'SUPPLIER',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    nullable: false,
    example: 'supplier',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    type: [Number],
    required: false,
    nullable: false,
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsInt({ each: true })
  permissionIds: number[];
}
