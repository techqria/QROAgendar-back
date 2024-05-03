import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ScheduleInput } from "../../database/inputs/schedule.input";
import { SpecialtyInput } from "../../database/inputs/specialty.input";
import { VetUpdateInput } from "../../database/inputs/vet-update.input";
import { VetInput } from "../../database/inputs/vet.input";
import { ScheduleValidator } from "../../database/validators/schedule.validator";
import { SpecialtyValidator } from "../../database/validators/specialty.validator";
import { UserValidator } from "../../database/validators/user.validor";
import { CustomerInput } from "../../database/inputs/customer.input";
import { roleEnum } from "../../database/dto/role.enum";
import { AnimalTypeValidator } from "../../database/validators/animal-type.validator";
import { AnimalTypeInput } from "../../database/inputs/animal_type.input";
import { AnimalInput } from "../../database/inputs/animal.input";
import { AnimalValidator } from "../../database/validators/animal.validator";
import { CustomerUpdateInput } from "src/database/inputs/customer-update.input";

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

    async getSchedulesByDateRange(startDate: Date, finalDate: Date): Promise<ScheduleValidator[]> {
        return await this.scheduleModel.find({
            date: {
                $gte: new Date(startDate).getTime(),
                $lte: new Date(finalDate).getTime()
            }
        });
    }

    async createVet(vet: VetInput): Promise<UserValidator> {
        const newVet = await this.userModel.create(vet)
        newVet.save();

        // atualizar quantidade de funcionários
        await this.increaseSpecialtyQttEmployees(newVet.specialty_id)

        return newVet;
    }

    private async increaseSpecialtyQttEmployees(specialty_id: string) {
        await this.specialtyModel.findByIdAndUpdate(specialty_id, {
            $inc: {
                qtt_employees: 1
            }
        })
    }

    private async decreaseSpecialtyQttEmployees(specialty_id: string) {
        await this.specialtyModel.findByIdAndUpdate(specialty_id, {
            $inc: {
                qtt_employees: -1
            }
        })
    }

    async createCustomer(customer: CustomerInput): Promise<UserValidator> {
        const newCustomer = await this.userModel.create(customer)
        newCustomer.save();
        return newCustomer;
    }

    async getAllCustomers(): Promise<UserValidator[]> {
        return await this.userModel.find({ role: roleEnum.customer })
    }

    async getCustomerById(id: string): Promise<UserValidator> {
        return await this.userModel.findById(id)
    }

    async removeCustomer(id: string): Promise<UserValidator> {
        return await this.userModel.findByIdAndDelete(id)
    }

    async updateCustomerById(newCustomer: CustomerInput): Promise<UserValidator> {
        return await this.userModel.findByIdAndUpdate(newCustomer.id,
            {
                $set: {
                    name: newCustomer.name,
                    email: newCustomer.email,
                    phone: newCustomer.phone,
                    birthdate: newCustomer.birthdate,
                    animals: newCustomer.animals,
                    adress: newCustomer.adress
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


    async removeAnimalType(id: string): Promise<AnimalTypeValidator> {
        return await this.animalTypeModel.findByIdAndDelete(id)
    }

    async updateAnimalTypeById(newAnimalType: AnimalTypeInput): Promise<AnimalTypeValidator> {
        return await this.animalTypeModel.findByIdAndUpdate(newAnimalType.id,
            {
                $set: {
                    name: newAnimalType.name,
                }
            },
            { new: true }
        )
    }

    async createAnimal(animal: AnimalInput): Promise<UserValidator> {
        return await this.userModel.findByIdAndUpdate(animal.userId, {
            $push: {
                animals: {
                    name: animal.name,
                    gender: animal.gender,
                    breed: animal.breed,
                    color: animal.color,
                    typeAnimalId: animal.typeAnimalId,
                    neutered: animal.neutered,
                    avatar: animal.avatar,
                }
            }
        })
    }

    async getAllAnimals(): Promise<AnimalValidator[][]> {
        return (await this.userModel.find()).map(el => el.animals)
    }

    async getAnimalById(userId: string, animalIndex: number): Promise<AnimalValidator> {
        return (await this.userModel.findById(userId)).animals[animalIndex]
    }

    async removeAnimal(userId: string, animalIndex: number): Promise<UserValidator> {
        const user = await this.userModel.findById(userId,);
        const userUpdated = user
        userUpdated.animals.splice(animalIndex, 1)

        return this.userModel.findByIdAndUpdate(userId, {
            $set: {
                animals: userUpdated.animals
            }
        })
    }

    async updateAnimalById(userId: string, newAnimal: AnimalInput, animalIndex: number): Promise<UserValidator> {
        const user = await this.userModel.findById(userId,);
        const userUpdated = user
        userUpdated.animals[animalIndex] = newAnimal

        return this.userModel.findByIdAndUpdate(userId, {
            $set: {
                animals: userUpdated.animals
            }
        })
    }

    async getVetById(id: string): Promise<UserValidator> {
        return await this.userModel.findById(id)
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

    async updateCustomerProfileById(id: string, customer: CustomerUpdateInput): Promise<UserValidator> {
        return await this.userModel.findByIdAndUpdate(id,
            {
                $set: {
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    password: customer.password,
                    image_url: customer.image_url,
                    birthdate: customer.birthdate,
                    adress: customer.adress,
                }
            },
            { new: true }
        )
    }

    async removeVetById(id: string): Promise<UserValidator> {
        const vetRemoved = await this.userModel.findByIdAndDelete(id)
        await this.decreaseSpecialtyQttEmployees(vetRemoved.specialty_id)
        return vetRemoved
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

    async verifyScheduleHour(date: Date, employee_id: string, specialty_id: string): Promise<number> {
        return (await this.scheduleModel.find({
            date: {
                $gte: new Date(date.getTime() - 30 * 60000), // 30 minutes before
                $lte: new Date(date.getTime() + 30 * 60000), // 30 minutes after
            },
            employee_id,
            specialty_id
        })).length
    }

    async updateAnimalByIndex(index: number, animal: AnimalInput): Promise<UserValidator> {
        return await this.userModel.findByIdAndUpdate(animal.userId,
            {
                $set: {
                    [`animals.${index}.avatar`]: animal.avatar,
                    [`animals.${index}.breed`]: animal.breed,
                    [`animals.${index}.color`]: animal.color,
                    [`animals.${index}.gender`]: animal.gender,
                    [`animals.${index}.name`]: animal.name,
                    [`animals.${index}.neutered`]: animal.neutered,
                    [`animals.${index}.typeAnimalId`]: animal.typeAnimalId,
                },
            },
            {
                new: true,
            }
        )
    }

    async removeAnimalByIndex(index: number, userId: string): Promise<UserValidator> {
        await this.userModel.findByIdAndUpdate(userId,
            { $unset: { [`animals.${index}`]: "" } },
        )

        return await this.userModel.findByIdAndUpdate(userId,
            { $pull: { animals: null } }, // Remove elements with value 'null'
            { new: true } // Return the updated document (optional)
        );
    }
}
