import { Field, InputType } from "@nestjs/graphql";
import { roleEnum } from "../dto/role.enum";

@InputType()
export class ManagerInput {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field({defaultValue: roleEnum.manager})
    role: roleEnum;

    @Field()
    phone: string
}