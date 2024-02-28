import { Field, InputType } from "@nestjs/graphql";
import { roleEnum } from "../dto/role.enum";
import { AdressInput } from "./adress.input";
import { AnimalInput } from "./animal.input";

@InputType()
export class CustomerInput {
    @Field()
    id: string;
    
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
    image_url?: string;

    @Field() 
    adress: AdressInput;

    @Field()
    birhdate?:Date

    @Field(type => [AnimalInput])
    animals?: AnimalInput[]
}