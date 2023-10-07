import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminService } from './admin.service';
import { ManagerInput } from '../../database/inputs/manager.input';
import { UserValidator } from "src/database/validators/user.validor";
import { GqlAuthGuard } from "src/guards/auth.guard";

@Resolver()
export class AdminResolver {
    constructor(
        private adminService: AdminService,
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
}

