import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameMessage {
  @Field(() => String)
  message: string;
}
