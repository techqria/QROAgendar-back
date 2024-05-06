import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SpecialtyType {
    @Field()
    price: number

    @Field()
    date: Date
}