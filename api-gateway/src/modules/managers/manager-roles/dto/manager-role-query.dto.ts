import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';

export class ManagerRoleQueryDto extends PaginationDto {
  @ApiProperty({
    type: 'enum',
    enum: ['id', 'slug'],
    required: true,
    nullable: false,
    default: 'id',
  })
  @IsIn(['id', 'slug'])
  @IsNotEmpty()
  orderBy: string;
}
