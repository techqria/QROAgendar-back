import { Field, ID, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";
import { PaymentMethodPercentageType } from "../types/payment-method-percentage.type";
import { AnnualRevenueType } from "../types/annual-revenue.type";
import { WeekScheduleHoursType } from "../types/week-schedule-hours.type";

@ObjectType()
export class DashboardValidator {
    @Field()
    @IsNotEmpty()
    paymentMethodsPercentage: PaymentMethodPercentageType

    @Field()
    @IsNotEmpty()
    annualRevenue: AnnualRevenueType;

    @Field()
    @IsNotEmpty()
    weekScheduleHours: WeekScheduleHoursType;
}