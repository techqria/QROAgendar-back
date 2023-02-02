import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType('Specialty')
export class SpecialtyValidator {
    @Field(type => ID)
    @IsNotEmpty()
    id: string;

    @Field()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsNotEmpty()
    qtt_employees: string;
}