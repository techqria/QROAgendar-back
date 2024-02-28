import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class AnimalTypeInput {
    @Field()
    id: string

    @Field()
    name: string
}