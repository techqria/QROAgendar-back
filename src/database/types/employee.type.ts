import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class EmployeeType {
    @Field()
    @IsNotEmpty()
    id: string;

    @Field()
    name: string;
}