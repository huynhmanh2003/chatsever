import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ChatroomType } from './chatroom.type';
import { MessageType } from './message.type';

@ObjectType('user')
export class UserType {
  @Field()
  name: string;
  @Field()
  password: string;
  @Field((type) => [ChatroomType])
  chatRooms: ChatroomType;
  @Field((type) => [MessageType])
  messages: MessageType[];
}
