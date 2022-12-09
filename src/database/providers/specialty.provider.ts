import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";
import { specialtySchema } from "../schema/specialty.schema";

export const specialtyProvider: Provider[] = [
    {
        provide: 'SPECIALTY_MODEL',
        useFactory: (connection: Connection) => connection.model('specialty', specialtySchema),
        inject: ['DB_CONNECTION']
    }
]