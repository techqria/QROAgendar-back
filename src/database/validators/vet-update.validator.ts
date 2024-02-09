import { Field, HideField, ID, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, Length, MinLength } from "class-validator"
import { roleEnum } from "../dto/role.enum";

@ObjectType()
export class VetUpdateValidator {

    @Field()
    @IsNotEmpty()
    id: string;

    @Field()
    @IsNotEmpty()
    @MinLength(4)
    name: string;

    @Field()
    @IsNotEmpty()
    @IsPhoneNumber('BR')
    phone: string;

    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @Length(7, 7)
    color?: string;

    @Field()
    @IsOptional()
    specialty_id?: string;
}