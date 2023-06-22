import { InputType, Float, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Schema } from 'mongoose';

@InputType()
export class CreateGameInput {
  @Field(() => String, { description: 'name of game' })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { description: 'description of game' })
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @Field(() => String, { description: 'image of game', nullable: true })
  image: string;

  @Field(() => Float, { description: 'price of game', nullable: true })
  price: string;

  @Field(() => [String], { description: 'category of game', nullable: true })
  category: string[];

  @Field(() => String, { description: 'release date of game' })
  releaseDate: string;

  @Field(() => String, { description: 'publisher of game', nullable: true })
  publisher: string;

  @Field(() => Int, { description: 'rating of game' })
  rating: number;

  @Field(() => String, { description: 'other of game', nullable: true })
  other: string;

  @Field(() => String, {
    description: 'user of review if user is logged in',
    nullable: true,
  })
  userId: Schema.Types.ObjectId;
}
