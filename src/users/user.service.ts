import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserValidator } from "../database/validators/user.validor";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<UserValidator>,
    ) { }

    async getUserById(id: string): Promise<UserValidator> {
        const user = await this.userModel.findById(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user
    }

    async changePassword(email: string, newPassword: string, repeatNewPassword: string): Promise<UserValidator> {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new NotFoundException('Usuário não encontrado');

        if (!newPassword || !repeatNewPassword) throw new Error("Você deve preencher os campos");
        if (newPassword !== repeatNewPassword) throw new Error("As senhas devem ser iguais");
        if (newPassword.length < 6) throw new Error("Senhas devem ter no mínimo 6 dígitos");

        if (bcrypt.compareSync(newPassword, user.password)) throw new Error("A nova senha não pode ser igual a anterior");

        const hashPassword = await bcrypt.hash(newPassword, await bcrypt.genSalt());

        return await this.userModel.findByIdAndUpdate(user.id, {
            $set: {
                password: hashPassword
            }
        })
    }
}
