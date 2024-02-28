import { Field, InputType } from "@nestjs/graphql";
import { roleEnum } from "../dto/role.enum";
import { AdressInput } from "./adress.input";
import { AnimalInput } from "./animal.input";
import { IsOptional } from "class-validator";

@InputType()
export class CustomerInput {
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

    @Field()
    image_url?: string;

    @Field() 
    adress: AdressInput;

    @Field()
    birthdate?:Date

    @Field(type => [AnimalInput])
    animals?: AnimalInput[]
}