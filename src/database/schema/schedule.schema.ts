import { Schema } from "mongoose";
import { paymentMethodEnum } from "../dto/payment_method.enum";

export const scheduleSchema = new Schema({
    pet_name: String,
    pet_type: String,
    customer_name: String,
    customer_phone: String,
    employee_id: String,
    specialty_id: String,
    date: Date,
    pet_breed: String,
    payment: {
        price: Number,
        method: { type: String, enum: paymentMethodEnum },
    },
},{ timestamps: true });