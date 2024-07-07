import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ChatroomService } from '../service/chatroom.service';
import { Chatroom } from '../entities/chatRoom.entity';
import { CreateChatRoomInput } from '../dto/chatRoom.dto';

@Resolver(() => Chatroom)
export class ChatroomResolver {
  constructor(private chatroomService: ChatroomService) {}

  @Mutation(() => Chatroom)
  createChatRoom(
    @Args('createChatRoomInput') createChatRoomInput: CreateChatRoomInput,
  ) {
    return this.chatroomService.createChatRoom(createChatRoomInput);
  }

  @Query(() => [Chatroom])
  chatRooms() {
    return this.chatroomService.findAll();
  }
}
