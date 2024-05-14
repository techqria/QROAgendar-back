import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ScheduleValidator } from "../../database/validators/schedule.validator";
import { AnimalValidator } from "../../database/validators/animal.validator";
import { UserValidator } from "../../database/validators/user.validor";
import { roleEnum } from "../../database/dto/role.enum";
import { AnimalTypeValidator } from "../../database/validators/animal-type.validator";
import { SpecialtyValidator } from "../../database/validators/specialty.validator";

@Injectable()
export class VetService {
    constructor(
        @Inject('SCHEDULE_MODEL')
        private scheduleModel: Model<ScheduleValidator>,

        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>,

        @Inject('ANIMAL_TYPE_MODEL')
        private animalTypeModel: Model<AnimalTypeValidator>,

        @Inject('SPECIALTY_MODEL')
        private specialtyModel: Model<SpecialtyValidator>,
    ) { }

    async getMySchedules(id: string): Promise<ScheduleValidator[]> {
        const schedules = await this.scheduleModel.find({ employee: { id } });
        if (!schedules) throw new NotFoundException('No appointment found.');
        return schedules;
    }

    async getScheduleById(id: string): Promise<ScheduleValidator> {
        return await this.scheduleModel.findById(id)
    }

    async getAnimalById(userId: string, animalIndex: number): Promise<AnimalValidator> {
        return (await this.userModel.findById(userId)).animals[animalIndex]
    }

    async getUserByNameAndPhone(name: string, phone: string): Promise<UserValidator> {
        return await this.userModel.findOne({ name, phone, role: roleEnum.customer })
    }

    async getAnimalTypeById(id: string): Promise<AnimalTypeValidator> {
        return await this.animalTypeModel.findById(id)
    }

    async getSpecialtyById(id: string): Promise<SpecialtyValidator> {
        return await this.specialtyModel.findById(id)
    }
}
