import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { EmployeeType } from "../types/employee.type";
import { PaymentType } from "../types/payment.type";

@ObjectType()
export class ScheduleCalendarValidator {
    @Field()
    id?: string;

    @Field()
    @IsNotEmpty()
    employee_name: string;

    @Field()
    @IsNotEmpty()
    employee_color: string;

    @Field()
    @IsNotEmpty()
    specialty_name: string;

    @Field()
    @IsNotEmpty()
    pet_name: string;

    @Field()
    @IsNotEmpty()
    customer_name: string;

    @Field()
    @IsNotEmpty()
    customer_phone: string;

    @Field()
    @IsNotEmpty()
    employee_id: string;

    @Field()
    @IsNotEmpty()
    specialty_id: string;

    @Field()
    @IsNotEmpty()
    date: Date;

    @Field()
    @IsNotEmpty()
    pet_breed: string;

    @Field()
    @IsNotEmpty()
    payment: PaymentType;

    @Field()
    @IsNotEmpty()
    pet_type: string;

}