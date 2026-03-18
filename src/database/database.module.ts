import { Inject, Logger, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, type ConfigType } from '@nestjs/config';
import databaseConfig from 'src/config/database.config';

@Module({
  imports: [ConfigModule.forFeature(databaseConfig)],
})
export class DatabaseModule implements OnModuleInit {
  private logger = new Logger(DatabaseModule.name);

  constructor(
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {}

  onModuleInit() {
    this.logger.log(this.dbConfig);
  }
}
