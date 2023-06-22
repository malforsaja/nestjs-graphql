import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ReviewMessage {
  @Field(() => String)
  message: string;
}
