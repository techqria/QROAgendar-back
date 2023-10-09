import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { DatabaseModule } from "../database/database.module";
import { userProvider } from "../database/providers/user.provider";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { UserService } from "../users/user.service";

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.NEXT_PUBLIC_JWT_SECRET,
                signOptions: {
                    expiresIn: '30d'
                }
            }) 
        })
    ],
    controllers: [],
    providers: [...userProvider, AuthService, AuthResolver, JwtStrategy, UserService]
})
export class AuthModule { }
