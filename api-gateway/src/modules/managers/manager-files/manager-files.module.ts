import { Module } from '@nestjs/common';
import { ManagerFilesService } from './manager-files.service';
import { ManagerFilesController } from './manager-files.controller';

@Module({
  controllers: [ManagerFilesController],
  providers: [ManagerFilesService],
})
export class ManagerFilesModule {}
