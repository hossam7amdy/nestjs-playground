import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Injectable()
export class AppService {
  constructor(private logger: LoggerService) {}

  hello(): string {
    this.logger.log('My name is `hello`');
    return 'Hello world!';
  }
}
