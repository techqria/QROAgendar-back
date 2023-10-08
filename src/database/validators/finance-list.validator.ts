import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class FinanceListValidator {
    @Field()
    @IsNotEmpty()
    employee_id: string

    @Field()
    @IsNotEmpty()
    employee_name: string;

    @Field()
    @IsNotEmpty()
    qtt_schedules: number;

    @Field()
    @IsNotEmpty()
    revenue_generated: number;
}