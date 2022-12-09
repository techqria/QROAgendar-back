import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from 'src/database/providers/user.provider';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, AdminResolver, AdminService]
})
export class AdminModule { }
