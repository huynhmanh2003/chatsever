import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class Notification {
  @Field()
  message: string;

  @Field(() => UserType)
  user: UserType;
}
