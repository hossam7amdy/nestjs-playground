import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
// import { ConfigModuleOptions } from './interfaces';
// import { CONFIG_MODULE_OPTIONS } from './constants';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './config.module-definition';

@Module({
  exports: [ConfigService],
  providers: [ConfigService],
})
export class ConfigModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE) {
    return {
      // extend with custom logic here
      ...super.register(options),
    };
  }

  static registerAsync(options: typeof ASYNC_OPTIONS_TYPE) {
    return {
      // extend with custom logic here
      ...super.registerAsync(options),
    };
  }
}
