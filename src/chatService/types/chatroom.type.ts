import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';
import { MessageType } from './message.type';

@ObjectType('Chatroom')
export class ChatroomType {
  @Field(() => ID)
  _id: string; // Sử dụng _id để tương thích với Mongoose ObjectId

  @Field(() => [UserType])
  users: UserType[];

  @Field(() => [MessageType])
  messages: MessageType[];
}
