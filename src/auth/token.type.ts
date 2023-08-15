import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokenType {
    @Field(() => String)
    userId: string;

    @Field(() => Boolean)
    userRole: boolean;
}