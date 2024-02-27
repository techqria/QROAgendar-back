import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class AdressType {

    @Field()
    cep: string

    @Field()
    city: string

    @Field()
    state: string

    @Field()
    neighborhood: string

    @Field()
    additionalInfo: string
}