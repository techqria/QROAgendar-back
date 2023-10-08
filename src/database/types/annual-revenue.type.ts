import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AnnualRevenueType {

    @Field()
    january: number

    @Field()
    february: number

    @Field()
    march: number

    @Field()
    april: number

    @Field()
    may: number

    @Field()
    june: number

    @Field()
    july: number

    @Field()
    august: number

    @Field()
    september: number

    @Field()
    october: number

    @Field()
    november: number

    @Field()
    december: number
}