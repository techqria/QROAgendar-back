import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { UserModule } from './user/user.module';
import { VetModule } from './vet/vet.module';

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