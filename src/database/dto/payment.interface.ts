import { paymentMethodEnum } from "./payment_method.enum";

export class IPayment {
    price: number;
    method: paymentMethodEnum;
}