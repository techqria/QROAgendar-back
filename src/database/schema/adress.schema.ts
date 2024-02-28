import { Schema } from "mongoose";

export const AdressSchema = new Schema({
    cep: String,
    city: String,
    state: String,
    neighborhood: String,
    additionalInfo: String,
})