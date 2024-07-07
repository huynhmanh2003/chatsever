import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createMessageInput {
  @Field()
  userFrom: string;

  @Field()
  userTo: string;

  @Field()
  content: string;
}
