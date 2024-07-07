import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chatroom } from '../entities/chatRoom.entity';
import { User } from '../entities/user.entity';
import { ChatroomService } from '../service/chatroom.service';
import { ChatroomResolver } from '../resolver/chatroom.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([Chatroom, User])],
  providers: [ChatroomService, ChatroomResolver],
})
export class ChatroomModule {}
