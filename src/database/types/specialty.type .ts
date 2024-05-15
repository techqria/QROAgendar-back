import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SpecialtyType {
    @Field()
    specialty: string

    @Field()
    color: string

    @Field()
    total_price: number

    @Field()
    qtt_consultations: number
}