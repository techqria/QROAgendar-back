import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserValidator } from "../database/validators/user.validor";
import { UserService } from "../users/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.NEXT_PUBLIC_JWT_SECRET,
        });
    }

    async validate(payload: { sub: UserValidator['id'], name: string }) {
        const user = this.userService.getUserById(payload.sub);
        if (!user) throw new UnauthorizedException('Unauthorized');
        return user;
    }
}