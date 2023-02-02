import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserValidator } from 'src/database/validators/user.validor';
import { SpecialtyValidator } from 'src/database/validators/specialty.validator';
import { ScheduleValidator } from 'src/database/validators/schedule.validator';
import { VetInput } from 'src/database/inputs/vet.input';
import { SpecialtyInput } from 'src/database/inputs/specialty.input';
import { ScheduleInput } from 'src/database/inputs/schedule.input';

@Injectable()
export class ManagerService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>,

        @Inject('SPECIALTY_MODEL')
        private specialtyModel: Model<SpecialtyValidator>,

        @Inject('SCHEDULE_MODEL')
        private scheduleModel: Model<ScheduleValidator>
    ) { }

    async getAllSpecialties(): Promise<SpecialtyValidator[]> {
        return await this.specialtyModel.find();
    }
    async getAllVets(): Promise<UserValidator[]> {
        return await this.userModel.find({role: "employee"});
    }
    async getAllSchedules(): Promise<ScheduleValidator[]> {
        return await this.scheduleModel.find();
    }

    async createVet(vet: VetInput): Promise<UserValidator> {
        const newVet = await this.userModel.create(vet)
        newVet.save();
        return newVet;
    }

    async createSpecialty(specialty: SpecialtyInput): Promise<SpecialtyValidator> {
        const newSpecialty = await this.specialtyModel.create(specialty)
        newSpecialty.save();
        return newSpecialty;
    }

    async createSchedule(schedule: ScheduleInput): Promise<ScheduleValidator> {
        const newSchedule = await this.scheduleModel.create(schedule)
        newSchedule.save();
        return newSchedule;
    }
    
}
