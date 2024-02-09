import { Field, InputType } from "@nestjs/graphql";
import { roleEnum } from "../dto/role.enum";

@InputType()
export class CustomerInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    role: roleEnum = roleEnum.customer;

    @Field()
    phone: string;

    @Field()
    image_url: string;
}