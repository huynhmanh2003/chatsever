import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  password: string;
}