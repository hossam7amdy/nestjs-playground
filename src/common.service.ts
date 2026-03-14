import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AppService } from './app.service';

@Injectable()
export class CommonService {
  constructor(
    @Inject(forwardRef(() => AppService))
    private appService: AppService,
  ) {}
}
