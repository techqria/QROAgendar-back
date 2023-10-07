import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";
import { userSchema } from "../schema/user.schema";

export const userProvider: Provider[] = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('user', userSchema),
    inject: ['DB_CONNECTION'],
  },
]