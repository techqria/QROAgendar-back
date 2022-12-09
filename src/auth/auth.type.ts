import { Field, ObjectType } from "@nestjs/graphql";
import { UserValidator } from "src/database/validators/user.validor";

@ObjectType()
export class AuthType {
    @Field(() => UserValidator)
    user: UserValidator;

    @Field(() => String)
    token: string;
}