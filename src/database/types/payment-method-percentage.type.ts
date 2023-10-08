import { Field, ObjectType } from "@nestjs/graphql";
import { paymentMethodEnum } from "../dto/payment_method.enum";

@ObjectType()
export class PaymentMethodPercentageType {
    @Field()
    debit: number;
    
    @Field()
    credit: number;
    
    @Field()
    money: number;
    
    @Field()
    pix: number;
}