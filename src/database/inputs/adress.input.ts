import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AdressInput {
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