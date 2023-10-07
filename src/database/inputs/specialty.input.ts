import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SpecialtyInput {
    @Field()
    title: string;
}