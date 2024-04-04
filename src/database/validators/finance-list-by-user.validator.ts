import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { PaymentType } from "../types/payment.type";

@ObjectType()
export class FinanceListByUserValidator {
    @Field()
    @IsNotEmpty()
    customer_name: string;

    @Field()
    @IsNotEmpty()
    date: Date;

    @Field()
    @IsNotEmpty()
    payment: PaymentType;

    @Field()
    @IsNotEmpty()
    pet_name: string;

    @Field()
    @IsNotEmpty()
    pet_type: string;
    
    @Field()
    @IsNotEmpty()
    pet_breed: string;
}
