import { Schema } from "mongoose";
import { roleEnum } from "../dto/role.enum";
import * as bcrypt from "bcrypt";
import { AdressSchema } from "./adress.schema";
import { AnimalSchema } from "./animal.schema";

export const userSchema = new Schema({
    name: String,
    role: String,
    phone: String,
    email: String,
    password: String,
    color: {
        type: String,
        required: function () {
            return this.role !== roleEnum.customer ? true : false
        }
    },
    image_url: String,
    specialty_id: {
        type: String,
        required: function () {
            return this.role === roleEnum.employee ? true : false
        }
    },
    adress: {
        type: AdressSchema,
        required: function () {
            return this.role == roleEnum.customer ? true : false
        }
    },
    birhdate: {
        type: Date,
        required: function () {
            return this.role == roleEnum.customer ? true : false
        }
    },
    animals: {
        type: [AnimalSchema],
        required: function () {
            return this.role == roleEnum.customer ? true : false
        }
    },
  
});

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
})