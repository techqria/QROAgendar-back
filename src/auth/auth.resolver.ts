import { Args, Query, Resolver } from "@nestjs/graphql";
import { UserValidator } from "src/database/validators/user.validor";
import { AuthService } from "./auth.service";
import { AuthType } from "./auth.type";

@Resolver(of => UserValidator)
export class AuthResolver {

    constructor(private readonly authService: AuthService) { }

    @Query(returns => AuthType)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<AuthType> {
        return await this.authService.login(email, password);

    }
}