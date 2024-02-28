import { Field, InputType } from "@nestjs/graphql";
import { GenderEnum } from "../dto/gender.enum";

@InputType()
export class AnimalInput {
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