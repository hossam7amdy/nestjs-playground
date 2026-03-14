import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { FeatureFlag } from '../custom/custom-metadata.decorator';

@Injectable()
export class ExampleService implements OnModuleInit {
  constructor(private discoveryService: DiscoveryService) {}

  onModuleInit() {
    const controllers = this.discoveryService.getControllers();
    console.log('controllers.length', controllers.length);

    const providers = this.discoveryService.getProviders();

    const [provider] = providers.filter(
      (item) =>
        this.discoveryService.getMetadataByDecorator(FeatureFlag, item) ===
        'experimental',
    );

    console.log(
      'Providers with the "experimental" feature flag metadata:',
      provider,
    );
  }
}
