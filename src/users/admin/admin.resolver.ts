import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { ManagerInput } from '../../database/inputs/manager.input';
import { UserValidator } from "src/database/validators/user.validor";
import { GqlAuthGuard } from "src/guards/auth.guard";
import { FinanceListValidator } from "src/database/validators/finance-list.validator";
import { ManagerService } from "../manager/manager.service";
import { FinanceListByUserValidator } from "src/database/validators/finance-list-by-user.validator";

@Resolver()
export class AdminResolver {
    constructor(
        private adminService: AdminService,
        private managerService: ManagerService,
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
    async getFinanceList(): Promise<FinanceListValidator[]> {

        const vets = await this.managerService.getAllVets()
        const vetsData: { id: string, name: string }[] = vets.map(vet => ({ id: vet.id, name: vet.name }))

        const schedules = await this.managerService.getAllSchedules()

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
        @Args('id') id: string
    ): Promise<FinanceListByUserValidator[]> {

        const schedules = await this.adminService.getScheduleByVetId(id)

        const financeList: FinanceListByUserValidator[] = schedules.map(
            ({ customer_name, date, payment }) => ({ customer_name, date, payment })
        )

        return financeList;
    }
}

