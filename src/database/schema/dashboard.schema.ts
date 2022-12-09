import { Schema } from "mongoose";

export const dashboardSchema = new Schema({
    invoicing: Number, //faturamento
    fixed_cost: Number,
    profit: Number
})