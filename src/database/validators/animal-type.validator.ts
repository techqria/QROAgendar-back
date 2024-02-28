import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AnimalTypeValidator {
    @Field({nullable: true})
    id: string
    
    @Field()
    name: string
}