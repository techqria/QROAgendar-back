import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { DatabaseModule } from "../../database/database.module";
import { userProvider } from "../../database/providers/user.provider";
import { ManagerService } from "../manager/manager.service";
import { ManagerResolver } from "../manager/manager.resolver";
import { scheduleProvider } from "../../database/providers/schedule.provider";
import { specialtyProvider } from "../../database/providers/specialty.provider";
import { animalTypeProvider } from "../../database/providers/animal_type.provider";
import { VetService } from "../vet/vet.service";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, ...scheduleProvider,...specialtyProvider,...animalTypeProvider, AdminResolver, AdminService, ManagerResolver, ManagerService, VetService]
})
export class AdminModule { }
