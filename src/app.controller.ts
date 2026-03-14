import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('')
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  hello(): string {
    return this.appService.hello();
  }

  @Get('/lazy')
  lazyHello(): Promise<string> {
    return this.appService.helloLazy();
  }
}
