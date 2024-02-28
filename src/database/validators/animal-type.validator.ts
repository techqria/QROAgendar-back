import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AnimalTypeValidator {
    @Field()
    name: string
}