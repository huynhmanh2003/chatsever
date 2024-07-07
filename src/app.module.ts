import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver } from '@nestjs/apollo';
import { UserModule } from './chatService/module/user.module';
import { MessageModule } from './chatService/module/message.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sa:Manh270603@vanmanh123.bvzo5cd.mongodb.net/ChatApp?retryWrites=true&w=majority&appName=vanmanh123',
    ),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
    }),
    UserModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
