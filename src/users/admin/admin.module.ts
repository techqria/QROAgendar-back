import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "src/database/providers/user.provider";
import { ManagerService } from "../manager/manager.service";
import { ManagerResolver } from "../manager/manager.resolver";
import { scheduleProvider } from "src/database/providers/schedule.provider";
import { specialtyProvider } from "src/database/providers/specialty.provider";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, ...scheduleProvider,...specialtyProvider, AdminResolver, AdminService, ManagerResolver, ManagerService]
})
export class AdminModule { }
