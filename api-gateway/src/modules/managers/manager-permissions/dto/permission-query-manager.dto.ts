import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';

export class ManagerPermissionQueryDto extends PaginationDto {
  @ApiProperty({
    type: 'enum',
    enum: ['id', 'slug'],
    required: true,
    example: 'id',
    nullable: false,
  })
  @IsNotEmpty()
  @IsIn(['id', 'slug'])
  orderBy: string;
}
