import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { ManagerInput } from '../../database/inputs/manager.input';
import { UserValidator } from "../../database/validators/user.validor";
import { GqlAuthGuard } from "../../guards/auth.guard";
import { FinanceListValidator } from "../../database/validators/finance-list.validator";
import { ManagerService } from "../manager/manager.service";
import { FinanceListByUserValidator } from "../../database/validators/finance-list-by-user.validator";
import { getAnnualRevenue } from "../../functions/get-annual-revenue";
import { getPaymentMethodsPercentage } from "../../functions/get-payment-methods-percentage";
import { getDateRangeScheduleHours } from "../../functions/get-date-range-schedule-hours";
import { DashboardValidator } from "../../database/validators/dashboard.validator";
import { VetService } from "../vet/vet.service";
import { DashboardFinanceValidator } from "../../database/validators/dashboard-finance.validator";
import { getPaymentMethodsValue } from "../../functions/get-payment-methods-value";
import { DashboardTimeValidator } from "../../database/validators/dashboard-time.validator";
import { DashboardSpecialtiesValidator } from "../../database/validators/dashboard-specialties.validator";

@Resolver()
export class AdminResolver {
    constructor(
        private adminService: AdminService,
        private managerService: ManagerService,
        private vetService: VetService,
    ) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [UserValidator])
    async getAllUsers(): Promise<UserValidator[]> {
        return await this.adminService.getAllUsers();
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserValidator)
    async deleteUser(
        @Args('id') id: string
    ): Promise<UserValidator> {
        return await this.adminService.deleteUser(id);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => UserValidator)
    async createManager(
        @Args('manager') manager: ManagerInput,
    ): Promise<UserValidator> {
        return await this.adminService.createManager(manager);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [FinanceListValidator])
    async getFinanceList(
        @Args('startDate') startDate: Date,
        @Args('finalDate') finalDate: Date
    ): Promise<FinanceListValidator[]> {

        const vets = await this.managerService.getAllVets()
        const vetsData: { id: string, name: string }[] = vets.map(vet => ({ id: vet.id, name: vet.name }))

        const schedules = await this.managerService.getSchedulesByDateRange(startDate, finalDate)

        const financeList: FinanceListValidator[] = vetsData.map(vet => {
            const schedulesFiltered = schedules.filter(el => el.employee_id == vet.id)

            const { length: qtt_schedules } = schedulesFiltered
            const revenue_generated = schedulesFiltered.reduce((acc, curr) => acc + curr.payment.price, 0)

            return { qtt_schedules, revenue_generated, employee_name: vet.name, employee_id: vet.id }
        })

        return financeList;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => [FinanceListByUserValidator])
    async getFinanceListByUser(
        @Args('id') id: string,
        @Args('startDate') startDate: Date,
        @Args('finalDate') finalDate: Date
    ): Promise<FinanceListByUserValidator[]> {
        const schedules = await this.adminService.getSchedulesByVetIdAndByDateRange(id, startDate, finalDate)
        const financeList: FinanceListByUserValidator[] = await Promise.all(schedules.map(
            async ({ customer_name, date, payment, pet_breed, pet_name, pet_type }) => (
                {
                    customer_name,
                    date, payment,
                    pet_name,
                    pet_breed,
                    pet_type: (await this.vetService.getAnimalTypeById(pet_type)).name
                }
            )
        ))

        return financeList;
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => DashboardValidator)
    async getDashboard(): Promise<DashboardValidator> {

        const schedules = await this.managerService.getAllSchedules()

        const paymentMethodsPercentage = getPaymentMethodsPercentage(schedules)
        const annualRevenue = getAnnualRevenue(schedules)
        const weekScheduleHours = getDateRangeScheduleHours(schedules)

        return {
            paymentMethodsPercentage,
            annualRevenue,
            weekScheduleHours,
        };
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => DashboardTimeValidator)
    async getDashboardTime(
        @Args('startDate') startDate: Date,
        @Args('finalDate') finalDate: Date
    ): Promise<DashboardTimeValidator> {
        const schedules = await this.managerService.getSchedulesByDateRange(startDate, finalDate)

        const dateRangeScheduleHours = getDateRangeScheduleHours(schedules)

        return {
            dateRangeScheduleHours,
        };
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => DashboardSpecialtiesValidator)
    async getDashboardSpecialties(
        @Args('startDate') startDate: Date,
        @Args('finalDate') finalDate: Date
    ): Promise<DashboardSpecialtiesValidator> {
        const schedules = await this.managerService.getSchedulesByDateRange(startDate, finalDate)

        const specialtiesArr = await Promise.all(
            schedules.map(async schedule => (
                {
                    specialty: (await this.managerService.getSpecialtyById(schedule.specialty_id)).title,
                    price: schedule.payment.price,
                }
            ))
        )

        const generateRandomColor = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        const result = specialtiesArr.reduce((acc: any[], curr: any) => {
            if (acc.find(el => el.specialty == curr.specialty)) {
                const index = acc.findIndex(el => el.specialty == curr.specialty)
                acc[index].total_price += curr.price
                acc[index].qtt_consultations += 1
            } else {
                acc.push({
                    specialty: curr.specialty,
                    color: generateRandomColor(),
                    total_price: curr.price,
                    qtt_consultations: 1,
                })
            }

            return acc
        }, [])

        return { specialties: result }
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => DashboardFinanceValidator)
    async getDashboardFinance(
        @Args('startDate') startDate: Date,
        @Args('finalDate') finalDate: Date
    ): Promise<DashboardFinanceValidator> {
        const schedules = await this.managerService.getSchedulesByDateRange(startDate, finalDate)

        const paymentMethods = getPaymentMethodsValue(schedules)

        return {
            paymentMethods,
        }
    }
}