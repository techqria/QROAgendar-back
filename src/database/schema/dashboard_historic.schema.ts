import { Schema } from "mongoose";

export const dashboardHistoricSchema = new Schema({
    historic: [{
        invoicing: Number, 
        fixed_cost: Number,
        profit: Number,
        date: Date
    }]
},{ timestamps: true })