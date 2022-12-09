import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator"
import { roleEnum } from "../dto/role.enum";

@ObjectType('User')
export class UserValidator {

    @Field(type => ID)
    @IsNotEmpty()
    id: string;

    @Field()
    @IsNotEmpty()
    @MinLength(4)
    name: string;
    
    @Field()
    @IsNotEmpty()
    role: roleEnum;

    @Field()
    @IsNotEmpty()
    @IsPhoneNumber('BR')
    phone: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @HideField()
    @IsNotEmpty()
    @MinLength(6)
    password: string 
}