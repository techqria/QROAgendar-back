import { Field, ObjectType } from "@nestjs/graphql";
import { GenderEnum } from "../dto/gender.enum";

@ObjectType()
export class AnimalType {
    @Field()
    name:string
    
    @Field()
    gender: GenderEnum
    
    @Field()
    breed:string

    @Field()
    color:string

    @Field()
    typeAnimalId:string

    @Field()
    neutered:boolean

    @Field()
    avatar:string
}