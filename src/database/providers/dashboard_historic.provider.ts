import { Provider } from "@nestjs/common";
import { Connection } from "mongoose";
import { dashboardHistoricSchema } from "../schema/dashboard_historic.schema";

export const dashboardHistoricProvider: Provider[] = [
    {
        provide: 'DASHBOARD_HISTORIC_MODEL',
        useFactory: (connection: Connection) => connection.model('dashboard_historic', dashboardHistoricSchema),
        inject: ['DB_CONNECTION'],
      },
]