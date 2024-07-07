import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatRoomInput {
  @Field(() => String)
  userFrom: string;

  @Field(() => String)
  userTo: string;
}
