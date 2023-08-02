import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserValidator } from 'src/database/validators/user.validor';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>,
    ) { }

    async getUserById(id: string): Promise<UserValidator> {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException('User not found. Please, check user ID');
        return user
    }

    async changePassword(email: string, newPassword: string, repeatNewPassword: string): Promise<UserValidator> {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new NotFoundException('User not found. Please, check user ID');
        if (newPassword !== repeatNewPassword) throw new Error("password and confirm password don't match");

        user.password = newPassword;

        const userUpdated = await user.save();
        
        return userUpdated
    }


}
