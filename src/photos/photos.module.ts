import { Module } from '@nestjs/common';
import { PhotoController } from './photos.controller';
import { photoRepository } from './photos.repository';
import { PhotoService } from './photos.service';
import { databaseProvider } from 'src/providers/database.provider';

@Module({
  providers: [databaseProvider, photoRepository, PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
