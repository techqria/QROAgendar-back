import { Field, InputType } from "@nestjs/graphql";
import { GenderEnum } from "../dto/gender.enum";

@InputType()
export class AnimalInput {
    @Field()
    userId:string

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

    @Field({nullable: true})
    avatar:string
}