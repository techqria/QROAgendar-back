import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserValidator } from 'src/database/validators/user.validor';

@Injectable()
export class AdminService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>
    ) { }

    async getAllUsers(): Promise<UserValidator[]> {
        return await this.userModel.find();
    }
}
