import { Module } from '@nestjs/common';
import { AdminResolver } from './admin.resolver';
import { AdminService } from './admin.service';
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "src/database/providers/user.provider";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, AdminResolver, AdminService]
})
export class AdminModule { }
