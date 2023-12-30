import { UsePipes, applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export const IsPhone = () => {
  return applyDecorators(
    ApiProperty({
      type: Number,
      required: true,
      nullable: false,
      example: 63412114,
    }),
    IsNumber(),
    IsNotEmpty(),
    Min(61000000, { message: 'Phonenumber is invalid' }),
    Max(75999999, { message: 'Phonenumber is invalid' }),
  );
};
