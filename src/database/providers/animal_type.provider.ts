import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";
import { animalTypeSchema } from "../schema/animal_type.schema";

export const animalTypeProvider: Provider[] = [
  {
    provide: 'ANIMAL_TYPE_MODEL',
    useFactory: (connection: Connection) => connection.model('animal_type', animalTypeSchema),
    inject: ['DB_CONNECTION'],
  },
]