import { Field, InputType } from "@nestjs/graphql";
import { roleEnum } from "../dto/role.enum";
import { AdressInput } from "./adress.input";

@InputType()
export class CustomerUpdateInput {
    @Field({nullable: true})
    id?: string;
    
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

    @Field({nullable: true})
    image_url?: string;

    @Field() 
    adress: AdressInput;

    @Field()
    birthdate?:Date
}