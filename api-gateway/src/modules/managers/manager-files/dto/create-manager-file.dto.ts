import { ApiProperty } from '@nestjs/swagger';

export class CreateManagerFileDto {
  @ApiProperty({
    type: [String],
    format: 'binary',
    required: true,
  })
  files: Express.Multer.File[];
}
