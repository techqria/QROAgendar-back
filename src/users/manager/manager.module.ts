import { Module } from '@nestjs/common';
import { ManagerResolver } from './manager.resolver';
import { ManagerService } from './manager.service';
import { DatabaseModule } from "../../database/database.module";
import { userProvider } from "../../database/providers/user.provider";
import { specialtyProvider } from "../../database/providers/specialty.provider";
import { scheduleProvider } from "../../database/providers/schedule.provider";
import { animalTypeProvider } from "../../database/providers/animal_type.provider";
import { VetService } from "../vet/vet.service";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, ...specialtyProvider,...animalTypeProvider, ...scheduleProvider, ManagerResolver, ManagerService, VetService]
})
export class ManagerModule { }
