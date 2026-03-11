import { DataSource } from 'typeorm';
import { Photo } from './entities/photos.entity';
import { DATABASE_PROVIDER } from '../providers/database.provider';

export const PHOTO_REPOSITORY = Symbol('PHOTO_REPOSITORY');

export const photoRepository = {
  provide: PHOTO_REPOSITORY,
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Photo),
  inject: [DATABASE_PROVIDER],
};
