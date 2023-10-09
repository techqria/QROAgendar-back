import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { DatabaseModule } from "../database/database.module";
import { userProvider } from "../database/providers/user.provider";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, UserResolver, UserService]
})
export class UserModule {}
