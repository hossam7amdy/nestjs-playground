import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photos.service';

@Controller('photos')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get()
  async listPhotos() {
    return this.photoService.findAll();
  }
}
