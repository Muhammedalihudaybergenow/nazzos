import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/common/dtos';

export class ManagerUserQueryResponseDto extends PaginationDto {
  @ApiProperty({
    type: 'enum',
    enum: ['id', 'loginAt', 'createdAt'],
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsIn(['id', 'loginAt', 'createdAt'])
  orderBy: string;
}
