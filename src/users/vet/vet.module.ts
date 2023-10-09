import { Module } from '@nestjs/common';
import { VetResolver } from './vet.resolver';
import { VetService } from './vet.service';
import { DatabaseModule } from "../../database/database.module";
import { scheduleProvider } from "../../database/providers/schedule.provider";

@Module({
  imports: [DatabaseModule],
  providers: [...scheduleProvider,VetResolver, VetService]
})
export class VetModule {}
