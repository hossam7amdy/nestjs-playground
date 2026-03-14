import { Injectable } from '@nestjs/common';

@Injectable()
export class LazyService {
  lazyHello() {
    return 'Lazy Hello!';
  }
}
