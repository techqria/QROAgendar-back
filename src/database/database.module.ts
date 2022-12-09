import { Module } from '@nestjs/common';
import { databaseProvider } from 'src/database/providers/database.provider';

@Module({
    providers: [...databaseProvider],
    exports: [...databaseProvider]
})
export class DatabaseModule {}
