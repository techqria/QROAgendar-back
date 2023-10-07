import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserValidator } from "src/database/validators/user.validor";
import { UserService } from "src/users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: { sub: UserValidator['id'], name: string }) {
        const user = this.userService.getUserById(payload.sub);
        console.log("user")
        if (!user) throw new UnauthorizedException('Unauthorized');
        return user;
    }
}