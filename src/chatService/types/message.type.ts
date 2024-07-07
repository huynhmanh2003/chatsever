import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';
import { ChatroomType } from './chatroom.type';

@ObjectType('Message')
export class MessageType {


  @Field()
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  userFrom: string;

  @Field()
  userTo: string;

  @Field(() => ChatroomType)
  chatroom: ChatroomType;

  @Field()
  isSeen: boolean;
}
