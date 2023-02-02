import { Field,  InputType } from "@nestjs/graphql";
import { EmployeeInput } from "./employee.input";
import { PaymentInput } from "./payment.input";

@InputType()
export class ScheduleInput {
    @Field()
    pet_name: string;

    @Field()
    customer_name: string;

    @Field()
    customer_phone: string;

    @Field()
    employee: EmployeeInput;

    @Field()
    date: Date;

    @Field()
    pet_breed: string;

    @Field()
    payment: PaymentInput;

    @Field()
    pet_type: string;
}