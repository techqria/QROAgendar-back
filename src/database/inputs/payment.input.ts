import { Field,  InputType } from "@nestjs/graphql";
import { paymentMethodEnum } from "../dto/payment_method.enum";

@InputType()
export class PaymentInput {
    @Field()
    price: number;
    
    @Field()
    method: paymentMethodEnum;
}