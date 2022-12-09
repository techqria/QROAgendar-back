import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";
import { dashboardSchema } from "../schema/dashboard.schema";

export const dashboardHistoricProvider: Provider[] = [
    {
        provide: 'DASHBOARD_MODEL',
        useFactory: (connection: Connection) => connection.model('dashboard', dashboardSchema),
        inject: ['DB_CONNECTION'],
      },
]