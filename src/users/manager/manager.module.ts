import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from 'src/database/providers/user.provider';
import { ManagerResolver } from './manager.resolver';
import { ManagerService } from './manager.service';
import { specialtyProvider } from 'src/database/providers/specialty.provider';
import { scheduleProvider } from 'src/database/providers/schedule.provider';

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, ...specialtyProvider, ...scheduleProvider, ManagerResolver, ManagerService]
})
export class ManagerModule { }
