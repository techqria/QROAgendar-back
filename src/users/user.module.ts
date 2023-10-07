import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { DatabaseModule } from "src/database/database.module";
import { userProvider } from "src/database/providers/user.provider";

@Module({
    imports: [DatabaseModule],
    providers: [...userProvider, UserResolver, UserService]
})
export class UserModule {}
