import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ManagerService } from './manager.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from "src/guards/auth.guard";
import { UserValidator } from "src/database/validators/user.validor";
import { VetInput } from "src/database/inputs/vet.input";
import { VetUpdateValidator } from "src/database/validators/vet-update.validator";
import { VetUpdateInput } from "src/database/inputs/vet-update.input";
import { SpecialtyInput } from "src/database/inputs/specialty.input";
import { SpecialtyValidator } from "src/database/validators/specialty.validator";
import { ScheduleValidator } from "src/database/validators/schedule.validator";
import { ScheduleInput } from "src/database/inputs/schedule.input";
import { ScheduleCalendarValidator } from "src/database/validators/schedule-calendar.validator";

@Resolver()
export class ManagerResolver {
    constructor(
        private managerService: ManagerService
    ) { }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserValidator)
    async createVet(
        @Args('vet') vet: VetInput,
    ): Promise<UserValidator> {
        return await this.managerService.createVet(vet);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserValidator)
    async updateVet(
        @Args('vet') vet: VetUpdateInput,
    ): Promise<VetUpdateValidator> {
        return await this.managerService.updateVetById(vet);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserValidator)
    async removeVet(
        @Args('id') id: string,
    ): Promise<UserValidator> {
        return await this.managerService.removeVetById(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => SpecialtyValidator)
    async removeSpecialty(
        @Args('id') id: string,
    ): Promise<SpecialtyValidator> {
        console.log(id)
        return await this.managerService.removeSpecialtyById(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => SpecialtyValidator)
    async createSpecialty(
        @Args('specialty') specialty: SpecialtyInput,
    ): Promise<SpecialtyValidator> {
        return await this.managerService.createSpecialty(specialty);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [SpecialtyValidator])
    async getAllSpecialties(): Promise<SpecialtyValidator[]> {
        return await this.managerService.getAllSpecialties();
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserValidator])
    async getAllVets(): Promise<UserValidator[]> {
        return await this.managerService.getAllVets();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => ScheduleValidator)
    async createSchedule(
        @Args('schedule') schedule: ScheduleInput,
    ): Promise<ScheduleValidator> {
        console.log(schedule)
        return await this.managerService.createSchedule(schedule);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [ScheduleValidator])
    async getSchedules(): Promise<ScheduleValidator[]> {
        return await this.managerService.getAllSchedules();
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [ScheduleCalendarValidator])
    async getSchedulesCalendar(): Promise<ScheduleCalendarValidator[]> {

        const schedules = await this.managerService.getAllSchedules()

        const schedulePromises: Promise<ScheduleCalendarValidator>[] = schedules.map(async schedule => {
            console.log( '\n 96',await this.managerService.getVetById(schedule.employee_id))
            const { name, color } = await this.managerService.getVetById(schedule.employee_id)
            const { title } = await this.managerService.getSpecialtyById(schedule.specialty_id)

            return {
                specialty_name: title,
                pet_name: schedule.pet_name,
                customer_name: schedule.customer_name,
                customer_phone: schedule.customer_phone,
                employee_id: schedule.employee_id,
                specialty_id: schedule.specialty_id,
                date: schedule.date,
                pet_breed: schedule.pet_breed,
                payment: schedule.payment,
                pet_type: schedule.pet_type,
                employee_name: name,
                employee_color: color
            }
        })

        const scheduleCalendar: ScheduleCalendarValidator[] = await Promise.all(schedulePromises);
        
        return scheduleCalendar;
    }

}
