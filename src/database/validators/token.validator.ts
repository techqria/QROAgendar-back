import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class TokenValidator {
    @Field()
    @IsNotEmpty()
    userId: string

    @Field()
    @IsNotEmpty()
    userRole: string
}