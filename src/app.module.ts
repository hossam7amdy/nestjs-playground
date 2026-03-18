import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConditionalModule } from '@nestjs/config';
import type { ConfigType } from '@nestjs/config';
import { CacheModule } from './cache/cache.module';
import { DatabaseModule } from './database/database.module';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    DatabaseModule,
    ConditionalModule.registerWhen(CacheModule, (env) => !!env['USE_CACHE'], {
      timeout: 100,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  private logger = new Logger(AppModule.name);

  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,
  ) {}

  onModuleInit() {
    this.logger.log(this.config);
  }
}
