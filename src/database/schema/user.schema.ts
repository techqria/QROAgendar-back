import { Schema } from "mongoose";
import { roleEnum } from "../dto/role.enum";
import * as bcrypt from "bcrypt";

export const userSchema = new Schema({
    name: String,
    role: String,
    phone: String,
    email: String,
    password: String,
    color: String,
    image_url: String,
    specialty_id: {
        type: String,
        required: function () {
            return this.role === roleEnum.employee ? true : false
        }
    }
});

userSchema.pre('save', async function (next) {

    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
})