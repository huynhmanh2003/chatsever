import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatroom } from './entities/chatRoom.entity';
import { User } from './entities/user.entity';
import { ChatroomService } from './chatroom.service';
import { ChatroomResolver } from './chatroom.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Chatroom, User])],
  providers: [ChatroomService, ChatroomResolver],
})
export class ChatroomModule {}
