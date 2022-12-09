import { Schema } from "mongoose";

export const userSchema = new Schema({
    name: String,
    role: String,
    phone: String,
    email: String,
    password: String
});