import { Field, InputType } from "@nestjs/graphql";
import { roleEnum } from "../dto/role.enum";

@InputType()
export class VetUpdateInput {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    role: roleEnum = roleEnum.employee;

    @Field()
    phone: string;

    @Field()
    color: string;

    @Field()
    specialty_id?: string;

}