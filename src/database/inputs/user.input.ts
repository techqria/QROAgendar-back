import { Field, InputType } from "@nestjs/graphql";
import { roleEnum } from "src/database/dto/role.enum";

@InputType()
export class UserInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role: roleEnum;

    @Field()
    phone: string;

    @Field()
    color: string;

    @Field()
    image_url: string;

    @Field()
    specialty_id?: string;
}