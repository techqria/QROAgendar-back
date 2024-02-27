import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AnimalType {
    @Field()
    name:string
    
    @Field()
    gender: "female" | "male"
    
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