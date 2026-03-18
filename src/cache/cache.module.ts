import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import cacheConfig from 'src/config/cache.config';

@Module({})
export class CacheModule implements OnModuleInit {
  private logger = new Logger(CacheModule.name);

  constructor(
    @Inject(cacheConfig.KEY)
    private dbConfig: ConfigType<typeof cacheConfig>,
  ) {}

  onModuleInit() {
    this.logger.log(this.dbConfig);
  }
}
