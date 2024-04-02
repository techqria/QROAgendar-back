import { Schema } from "mongoose";

export const AnimalSchema = new Schema({
    name: String,
    gender: String,
    breed: String,
    color: String,
    typeAnimalId: String,
    neutered: Boolean,
    avatar: String,
},{ timestamps: true })