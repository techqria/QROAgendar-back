import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserValidator } from "../database/validators/user.validor";
import { GqlAuthGuard } from "../guards/auth.guard";
import { ChangePasswordValidator } from "src/database/validators/change-password.validator";

@Resolver(of => UserValidator)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => UserValidator)
    async getUserById(
        @Args('id') id: string,
    ): Promise<UserValidator> {
        return await this.userService.getUserById(id);
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => ChangePasswordValidator)
    async changePassword(
        @Args('email') email: string,
        @Args('newPassword') newPassword: string,
        @Args('repeatNewPassword') repeatNewPassword: string,
    ): Promise<ChangePasswordValidator> {
        return await this.userService.changePassword(email, newPassword ,repeatNewPassword);
    }
}
