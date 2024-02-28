import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType('Adress')
export class AdressType {

    @Field()
    cep: String

    @Field()
    city: String

    @Field()
    state: String

    @Field()
    neighborhood: String

    @Field()
    additionalInfo: String
}