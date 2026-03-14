import { Injectable, OnModuleInit } from '@nestjs/common';
import { AppService } from '../app.service';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class CommonService implements OnModuleInit {
  private appService: AppService;

  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.appService = this.moduleRef.get(AppService, { strict: false });
  }
}
