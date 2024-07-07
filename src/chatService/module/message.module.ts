import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../entities/message.entity';
import { Chatroom, ChatroomSchema } from '../entities/chatroom.entity';
import { UserModule } from './user.module'; // Import UserModule
import { MessageService } from '../service/message.service';
import { MessageResolver } from '../resolver/message.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Chatroom.name, schema: ChatroomSchema },
    ]),
    UserModule,
    // Ensure UserModule is imported here
  ],
  providers: [MessageService, MessageResolver],
})
export class MessageModule {}
