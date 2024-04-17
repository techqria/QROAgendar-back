import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength } from "class-validator"

@ObjectType('')
export class ChangePasswordValidator {

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @HideField()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

}