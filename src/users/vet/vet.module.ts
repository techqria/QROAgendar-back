import { Module } from '@nestjs/common';
import { VetResolver } from './vet.resolver';
import { VetService } from './vet.service';
import { DatabaseModule } from 'src/database/database.module';
import { scheduleProvider } from 'src/database/providers/schedule.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...scheduleProvider,VetResolver, VetService]
})
export class VetModule {}
