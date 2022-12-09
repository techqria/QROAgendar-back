import { Schema } from "mongoose";
import { IPayment } from "../dto/payment.interface";

export const scheduleSchema = new Schema({
    pet_name: String,
    customer_name: String,
    customer_phone: String,
    employee: String,
    date: Date,
    pet_breed: String,
    payment: IPayment,
});