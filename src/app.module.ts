import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './users/admin/admin.module';
import { ManagerModule } from './users/manager/manager.module';
import { UserModule } from './users/user.module';
import { VetModule } from './users/vet/vet.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    VetModule,
    AdminModule,
    ManagerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ req })
    }),
  ]
})
export class AppModule { }