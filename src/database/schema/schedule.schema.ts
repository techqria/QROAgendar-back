import { Schema } from "mongoose";
import { paymentMethodEnum } from "../dto/payment_method.enum";

export const scheduleSchema = new Schema({
    pet_name: String,
    pet_type: String,
    customer_name: String,
    customer_phone: String,
    employee: {
        id: String,
        name: String,
    },
    date: Date,
    pet_breed: String,
    payment: {
        price: Number,
        method: { type: String, enum: paymentMethodEnum },
    },
});