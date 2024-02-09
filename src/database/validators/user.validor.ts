import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength } from "class-validator"
import { roleEnum } from "../dto/role.enum";

@ObjectType('User')
export class UserValidator {

    @Field(type => ID)
    @IsNotEmpty()
    id: string;

    @Field()
    @IsNotEmpty()
    clinic: string;

    @Field()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @Field()
    @IsNotEmpty()
    @IsEnum(roleEnum, { message: "Role must be manager or employee" })
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
    password: string;

    @Field()
    @IsNotEmpty()
    @Length(7, 7)
    color?: string;

    @Field()
    @IsNotEmpty()
    image_url: string;

    @Field()
    @IsOptional()
    specialty_id?: string;
}