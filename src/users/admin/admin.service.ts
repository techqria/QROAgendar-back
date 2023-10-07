import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ManagerInput } from '../../database/inputs/manager.input';
import { UserValidator } from "src/database/validators/user.validor";

@Injectable()
export class AdminService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>
    ) { }

    async getAllUsers(): Promise<UserValidator[]> {
        return await this.userModel.find();
    }

    async deleteUser(id: string): Promise<UserValidator> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async createManager(manager: ManagerInput): Promise<UserValidator> {
        const newManager = await this.userModel.create(manager)
        newManager.save();
        return newManager;
    }
}
