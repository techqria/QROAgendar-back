import { Module } from '@nestjs/common';
import { VetResolver } from './vet.resolver';

@Module({
  providers: [VetResolver]
})
export class VetModule {}
