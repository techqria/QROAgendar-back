import { Schema } from "mongoose";
import { roleEnum } from "../dto/role.enum";
import * as bcrypt from "bcrypt";
import { AdressType } from "../types/adress.type";
import { AnimalType } from "../types/animal.type";

export const userSchema = new Schema({
    name: String,
    role: roleEnum,
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
        type: AdressType,
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
        type: [AnimalType],
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