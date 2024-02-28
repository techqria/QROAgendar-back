import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ScheduleInput } from "../../database/inputs/schedule.input";
import { SpecialtyInput } from "../../database/inputs/specialty.input";
import { VetUpdateInput } from "../../database/inputs/vet-update.input";
import { VetInput } from "../../database/inputs/vet.input";
import { ScheduleValidator } from "../../database/validators/schedule.validator";
import { SpecialtyValidator } from "../../database/validators/specialty.validator";
import { UserValidator } from "../../database/validators/user.validor";
import { CustomerInput } from "src/database/inputs/customer.input";
import { roleEnum } from "src/database/dto/role.enum";
import { AnimalTypeValidator } from "src/database/validators/animal-type.validator";
import { AnimalTypeInput } from "src/database/inputs/animal_type.input";

@Injectable()
export class ManagerService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>,

        @Inject('SPECIALTY_MODEL')
        private specialtyModel: Model<SpecialtyValidator>,

        @Inject('SCHEDULE_MODEL')
        private scheduleModel: Model<ScheduleValidator>,

        
        @Inject('ANIMAL_TYPE_MODEL')
        private animalTypeModel: Model<AnimalTypeValidator>,
    ) { }

    async getAllSpecialties(): Promise<SpecialtyValidator[]> {
        return await this.specialtyModel.find();
    }
    async getAllVets(): Promise<UserValidator[]> {
        return await this.userModel.find({ role: "employee" });
    }
    async getAllSchedules(): Promise<ScheduleValidator[]> {
        return await this.scheduleModel.find();
    }

    async createVet(vet: VetInput): Promise<UserValidator> {
        const newVet = await this.userModel.create(vet)
        newVet.save();
        return newVet;
    }

    async createCustomer(customer: CustomerInput): Promise<UserValidator> {
        const newCustomer = await this.userModel.create(customer)
        newCustomer.save();
        return newCustomer;
    }

    async getAllCustomers(): Promise<UserValidator[]> {
        return await this.userModel.find({role: roleEnum.customer})
    }

    async getCustomerById(id:string): Promise<UserValidator> {
        return await this.userModel.findById(id)
    }

    async removeCustomer(id:string):Promise<UserValidator> {
        return await this.userModel.findByIdAndDelete(id)
    }

    async updateCustomerById(newCustomer: CustomerInput): Promise<UserValidator>{
        return await this.userModel.findByIdAndUpdate(newCustomer.id,
            {
                $set: {
                    name: newCustomer.name,
                    email: newCustomer.email,
                    phone: newCustomer.phone,
                    birhdate: newCustomer.birhdate,
                    animals: newCustomer.animals,
                    adress:newCustomer.adress
                }
            },
            { new: true }
        )
    }

    async createAnimalType(animalType: AnimalTypeInput): Promise<AnimalTypeValidator> {
        const newAnimalType = await this.animalTypeModel.create(animalType)
        newAnimalType.save();
        return newAnimalType;
    }

    async getAllAnimalTypes(): Promise<AnimalTypeValidator[]> {
        return await this.animalTypeModel.find()
    }

    async getAnimalTypeById(id:string): Promise<AnimalTypeValidator> {
        return await this.animalTypeModel.findById(id)
    }

    async removeAnimalType(id:string):Promise<AnimalTypeValidator> {
        return await this.animalTypeModel.findByIdAndDelete(id)
    }

    async updateAnimalTypeById(newAnimalType: AnimalTypeInput): Promise<AnimalTypeValidator>{
        return await this.animalTypeModel.findByIdAndUpdate(newAnimalType.id,
            {
                $set: {
                    name: newAnimalType.name,
                }
            },
            { new: true }
        )
    }

    async getVetById(id: string): Promise<UserValidator> {
        return await this.userModel.findById(id)
    }

    async getSpecialtyById(id: string): Promise<SpecialtyValidator> {
        return await this.specialtyModel.findById(id)
    }

    async updateVetById(newData: VetUpdateInput): Promise<UserValidator> {
        return await this.userModel.findByIdAndUpdate(newData.id,
            {
                $set: {
                    name: newData.name,
                    color: newData.color,
                    email: newData.email,
                    phone: newData.phone,
                    specialty_id: newData.specialty_id
                }
            },
            { new: true }
        )
    }

    async removeVetById(id: string): Promise<UserValidator> {
        return await this.userModel.findByIdAndDelete(id)
    }

    async removeSpecialtyById(id: string): Promise<SpecialtyValidator> {
        return await this.specialtyModel.findByIdAndDelete(id)
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
