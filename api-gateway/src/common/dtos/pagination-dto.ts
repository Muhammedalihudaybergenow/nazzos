import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
    example: 20,
  })
  @IsNotEmpty()
  @IsNumberString()
  limit: number;

  @ApiProperty({
    type: Number,
    required: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumberString()
  page: number;

  @ApiProperty({
    type: String,
    required: false,
    nullable: false,
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    type: 'enum',
    enum: ['ASC', 'DESC'],
    required: true,
    nullable: false,
    example: 'ASC',
  })
  @IsNotEmpty()
  @IsIn(['ASC', 'DESC'])
  orderDirection: 'ASC' | 'DESC';
}
