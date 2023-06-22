import { Schema } from 'mongoose';
import { CreateReviewInput } from './create-review.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field(() => String, { nullable: true })
  _id: Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  title: string;

  @Field(() => String, { nullable: true })
  comment: string;

  @Field(() => Number, { nullable: true })
  rating: number;
}
