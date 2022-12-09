import { HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { UserValidator } from 'src/database/validators/user.validor';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>,
        private jwtService: JwtService
    ) { }

    async login(email: string, password: string): Promise<AuthType> {
        const user = await this.userModel.findOne({ email, password });

        if (!user) throw new NotFoundException('User not found. Please, check your credentials');

        return {
            user,
            token: await this.jwtToken(user)
        }
    }

    private async jwtToken(user: UserValidator): Promise<string> {
        const payload = { username: user.name, sub: user.id };
        return this.jwtService.signAsync(payload);
    }

}
