import { Inject, Injectable } from '@nestjs/common';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { parse } from 'dotenv';

import type { ConfigModuleOptions, EnvConfig } from './interfaces';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    options: ConfigModuleOptions,
  ) {
    const filePath = `.env.${process.env.NODE_ENV || 'development'}`;
    const envFile = resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = parse(readFileSync(envFile));
  }

  get(key: string): string | undefined {
    return this.envConfig[key];
  }
}
