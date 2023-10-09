import * as mongoose from 'mongoose';

export const databaseProvider = [
    {
        provide: 'DB_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
            mongoose.connect(process.env.NEXT_PUBLIC_DB_URL),
    },
];