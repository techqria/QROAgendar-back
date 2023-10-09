import { Module } from '@nestjs/common';
import { ManagerResolver } from './manager.resolver';
import { ManagerService } from './manager.service';
import { DatabaseModule } from "../../database/database.module";
import { userProvider } from "../../database/providers/user.provider";
import { specialtyProvider } from "../../database/providers/specialty.provider";
import { scheduleProvider } from "../../database/providers/schedule.provider";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, ...specialtyProvider, ...scheduleProvider, ManagerResolver, ManagerService]
})
export class ManagerModule { }
