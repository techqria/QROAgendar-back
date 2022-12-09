import { Schema } from "mongoose";

export const specialtySchema = new Schema({
    title: String,
    qtt_employees: Number
});