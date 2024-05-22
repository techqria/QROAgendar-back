import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ManagerInput } from '../../database/inputs/manager.input';
import { UserValidator } from "../../database/validators/user.validor";
import { ScheduleValidator } from "../../database/validators/schedule.validator";

@Injectable()
export class AdminService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>,

        @Inject('SCHEDULE_MODEL')
        private scheduleModel: Model<ScheduleValidator>
    ) { }

    async getAllUsers(): Promise<UserValidator[]> {
        return await this.userModel.find();
    }

    async deleteUser(id: string): Promise<UserValidator> {
        return await this.userModel.findByIdAndDelete(id);
    }

    async createManager(manager: ManagerInput): Promise<any> {
        const newManager = await this.userModel.create(manager)
        newManager.save();
        return newManager;
    }

    async getScheduleByVetId(vetId: string): Promise<ScheduleValidator[]> {
        return await this.scheduleModel.find({ employee_id: vetId }).sort({ date: -1 });
    }

    async getSchedulesByVetIdAndByDateRange(vetId:string, startDate: Date, finalDate: Date): Promise<ScheduleValidator[]> {
        return await this.scheduleModel.find({
            employee_id: vetId,
            date: {
                $gte: new Date(startDate).getTime(),
                $lte: new Date(finalDate).getTime()
            }
        });
    }
}
