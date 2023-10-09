import { Args, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthType } from "./auth.type";
import { TokenType } from "./token.type";
import { UserValidator } from "../database/validators/user.validor";
import { TokenValidator } from "../database/validators/token.validator";

@Resolver(of => UserValidator)
export class AuthResolver {

    constructor(private readonly authService: AuthService) { }

    @Query(returns => AuthType)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<AuthType> {
        return await this.authService.login(email.toLowerCase(), password);

    }

    @Query(() => TokenValidator)
    async verifyToken(
        @Args('token') token: string
    ): Promise<TokenType> {
        return await this.authService.verifyToken(token)
    }
}