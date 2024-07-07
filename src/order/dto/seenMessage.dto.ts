import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SeenMessageDTO {
  @Field()
  UserFrom: string;

  @Field()
  UserTo: string;
}
