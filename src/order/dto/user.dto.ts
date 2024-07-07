import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDTO {
  @Field()
  name: string;

  @Field()
  password: string;
}
