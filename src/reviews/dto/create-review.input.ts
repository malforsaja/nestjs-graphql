import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';

@InputType()
export class CreateReviewInput {
  @Field(() => String, { description: 'title of review' })
  @IsNotEmpty()
  title: string;

  @Field(() => String, {
    description: 'email of user if its not logged in',
    nullable: true,
  })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'comment of review' })
  comment: string;

  @Field(() => Int, { description: 'rating of review' })
  rating: number;

  @Field(() => Date, { description: 'date of review', nullable: true })
  date: Date;

  @Field(() => String, { description: 'game of review' })
  gameId: Schema.Types.ObjectId;

  @Field(() => String, {
    description: 'user of review if user is logged in',
    nullable: true,
  })
  userId: Schema.Types.ObjectId;
}
