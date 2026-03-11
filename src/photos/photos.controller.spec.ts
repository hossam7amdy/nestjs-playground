import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from './photos.controller';
import { PhotoService } from './photos.service';
import { PHOTO_REPOSITORY } from './photos.repository';

describe('PhotoController', () => {
  let controller: PhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhotoController],
      providers: [
        PhotoService,
        { provide: PHOTO_REPOSITORY, useValue: { find: () => [] } },
      ],
    }).compile();

    controller = module.get<PhotoController>(PhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
