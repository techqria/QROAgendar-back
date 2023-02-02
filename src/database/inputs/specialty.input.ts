import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class SpecialtyInput {
    @Field()
    title: string;

    @Field()
    qtt_employees: number;
}