import { Module } from '@nestjs/common';
import { VetResolver } from './vet.resolver';
import { VetService } from './vet.service';
import { DatabaseModule } from "../../database/database.module";
import { scheduleProvider } from "../../database/providers/schedule.provider";
import { userProvider } from "src/database/providers/user.provider";
import { animalTypeProvider } from "src/database/providers/animal_type.provider";
import { specialtyProvider } from "src/database/providers/specialty.provider";
import { UserService } from "../user.service";

@Module({
  imports: [DatabaseModule],
  providers: [...scheduleProvider, ...userProvider, ...animalTypeProvider, ...specialtyProvider, VetResolver, VetService, UserService]
})
export class VetModule { }
