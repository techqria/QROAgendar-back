import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { PaymentMethodPercentageType } from "../types/payment-method-percentage.type";

@ObjectType()
export class DashboardFinanceValidator {
    @Field()
    @IsNotEmpty()
    paymentMethods: PaymentMethodPercentageType
}