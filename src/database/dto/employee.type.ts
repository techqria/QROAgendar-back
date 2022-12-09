import { Field, HideField, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class EmployeeType {
    @HideField()
    @IsNotEmpty()
    id: string;

    @Field()
    name: string;
}