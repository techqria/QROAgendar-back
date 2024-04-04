import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { VetService } from './vet.service';
import { ScheduleValidator } from "../../database/validators/schedule.validator";
import { GqlAuthGuard } from "../../guards/auth.guard";
import { ScheduleDetailValidator } from "src/database/validators/schedule-detail.validator";
import { AnimalValidator } from "src/database/validators/animal.validator";
import { UserService } from "../user.service";
import { AnimalTypeValidator } from "src/database/validators/animal-type.validator";

@Resolver(of => ScheduleValidator)
export class VetResolver {
    constructor(
        private readonly vetService: VetService,
        private readonly userService: UserService
    ) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [ScheduleValidator])
    async getMySchedules(
        @Args('id') id: string
    ): Promise<ScheduleValidator[]> {
        return await this.vetService.getMySchedules(id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => ScheduleValidator)
    async getScheduleById(
        @Args('id') id: string
    ): Promise<ScheduleValidator> {
        return await this.vetService.getScheduleById(id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => ScheduleDetailValidator)
    async getScheduleDetailsById(
        @Args('id') id: string
    ): Promise<ScheduleDetailValidator> {
        const {
            customer_name, customer_phone, pet_name,
            employee_id, payment, date, pet_breed,
            pet_type, specialty_id, text, id: schedule_id
        } = await this.vetService.getScheduleById(id);

        const { id: userId, animals } = await this.vetService.getUserByNameAndPhone(customer_name, customer_phone)

        const petIndex = animals.findIndex(el => el.name == pet_name)

        const { neutered: pet_neutered } = await this.vetService.getAnimalById(userId, petIndex)

        const { name: employee_name } = await this.userService.getUserById(employee_id)

        const { name: pet_type_name } = await this.vetService.getAnimalTypeById(pet_type)

        const { title: specialty_title } = await this.vetService.getSpecialtyById(specialty_id)

        return {
            customer_name,
            customer_phone,
            date,
            employee: employee_name,
            payment,
            pet_breed,
            pet_name,
            text,
            pet_neutered,
            pet_type: pet_type_name,
            specialty: specialty_title,
            id: schedule_id
        }
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => AnimalValidator)
    async getAnimalById(
        @Args('userId') userId: string,
        @Args('animalIndex') animalIndex: number
    ): Promise<AnimalValidator> {
        return await this.vetService.getAnimalById(userId, animalIndex)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => AnimalTypeValidator)
    async getAnimalTypeById(
        @Args('id') id: string,
    ): Promise<AnimalTypeValidator> {
        return await this.vetService.getAnimalTypeById(id)
    }
}