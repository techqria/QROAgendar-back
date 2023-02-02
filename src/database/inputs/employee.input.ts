import { Field,  InputType } from "@nestjs/graphql";

@InputType()
export class EmployeeInput {
    @Field()
    id: string;

    @Field()
    name: string;
}