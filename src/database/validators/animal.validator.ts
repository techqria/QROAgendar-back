import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { GenderEnum } from "../dto/gender.enum";

@ObjectType()
export class AnimalValidator {
    @Field()
    @IsNotEmpty()
    name:string

    @Field()
    @IsNotEmpty()
    gender: GenderEnum

    @Field()
    @IsNotEmpty()
    breed:string

    @Field()
    @IsNotEmpty()
    color:string

    @Field()
    @IsNotEmpty()
    typeAnimalId:string

    @Field()
    @IsNotEmpty()
    neutered:boolean

    @Field()
    @IsNotEmpty()
    avatar:string

}