import { Module } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [ImagesModule, VideosModule],
})
export class ManagersModule {}
