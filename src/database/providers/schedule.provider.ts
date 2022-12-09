import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";
import { scheduleSchema } from "../schema/schedule.schema";

export const scheduleProvider: Provider[] = [
    {
        provide: 'SCHEDULE_MODEL',
        useFactory: (connection: Connection) => connection.model('schedule', scheduleSchema),
        inject: ['DB_CONNECTION']
    }
]