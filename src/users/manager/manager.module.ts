import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from 'src/database/providers/user.provider';
import { ManagerResolver } from './manager.resolver';
import { ManagerService } from './manager.service';

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, ManagerResolver, ManagerService]
})
export class ManagerModule { }
