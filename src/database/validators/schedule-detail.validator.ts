import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { PaymentType } from "../types/payment.type";

@ObjectType()
export class ScheduleDetailValidator {
    @Field(type => ID)
    @IsNotEmpty()
    id: string;

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
    employee: string;

    @Field()
    @IsNotEmpty()
    specialty: string;

    @Field()
    @IsNotEmpty()
    date: Date;

    @Field()
    @IsNotEmpty()
    pet_breed: string;

    @Field()
    @IsNotEmpty()
    pet_neutered: boolean;

    @Field()
    @IsNotEmpty()
    payment: PaymentType;

    @Field()
    @IsNotEmpty()
    pet_type: string;

    @Field()
    text: string;
}