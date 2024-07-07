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

  @Field(() => UserType)
  userFrom: UserType;

  @Field(() => UserType)
  userTo: UserType;

  @Field(() => ChatroomType)
  chatroom: ChatroomType;

  @Field()
  isSeen: boolean;
}
