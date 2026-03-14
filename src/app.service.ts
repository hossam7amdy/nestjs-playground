import { Injectable, Logger } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';

@Injectable()
export class AppService {
  private attempt = 0;
  private logger = new Logger(AppService.name);

  constructor(private lazyModuleLoader: LazyModuleLoader) {}

  hello(): string {
    return 'Hello World!';
  }

  async helloLazy(): Promise<string> {
    const start = Date.now();

    const { LazyModule } = await import('./lazy-module/lazy-module.module.js');
    const moduleRef = await this.lazyModuleLoader.load(() => LazyModule);

    const { LazyService } =
      await import('./lazy-module/lazy-service.service.js');
    const lazyService = await moduleRef.resolve(LazyService);

    const end = Date.now();

    this.logger.log(`Load ${LazyModule.name} attempt: ${this.attempt}`);
    this.logger.log(`time: ${(end - start) / 1000}ms`);

    return lazyService.lazyHello();
  }
}
