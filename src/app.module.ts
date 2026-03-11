import { Module } from '@nestjs/common';
import { PhotoModule } from './photos/photos.module';

@Module({
  imports: [PhotoModule],
})
export class AppModule {}
